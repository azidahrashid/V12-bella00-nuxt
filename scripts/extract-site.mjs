#!/usr/bin/env node
import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const targetUrl = process.argv[2] || process.env.MIGRATION_TARGET_URL || 'https://www.bella00.com/'
const outDir = path.resolve(process.cwd(), 'artifacts')
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || process.env.CHROMIUM_PATH || undefined

await mkdir(outDir, { recursive: true })

async function safeWrite(name, value) {
  await writeFile(path.join(outDir, name), value ?? '', 'utf8')
}

async function fetchSource(url) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: {
        'user-agent': 'Mozilla/5.0 NuxtMigrationBot/1.0 permitted-site-capture',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    })
    return {
      ok: response.ok,
      status: response.status,
      url: response.url,
      html: await response.text()
    }
  } catch (error) {
    return { ok: false, status: 0, url, html: '', error: String(error) }
  }
}

const source = await fetchSource(targetUrl)
await safeWrite('source.html', source.html)

const browser = await chromium.launch({
  headless: true,
  executablePath,
  args: ['--disable-dev-shm-usage', '--no-sandbox', '--ignore-certificate-errors']
})

const page = await browser.newPage({
  viewport: { width: 1440, height: 1800 },
  userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari NuxtMigrationCapture/1.0'
})

const requests = []
const responses = []
const externalCss = []

page.on('request', request => {
  requests.push({
    method: request.method(),
    resourceType: request.resourceType(),
    url: request.url()
  })
})

page.on('response', async response => {
  const headers = response.headers()
  const contentType = headers['content-type'] || ''
  const item = {
    status: response.status(),
    url: response.url(),
    contentType
  }
  responses.push(item)

  if (contentType.includes('text/css') || response.url().match(/\.css(?:\?|$)/i)) {
    try {
      externalCss.push(`/* ${response.url()} */\n${await response.text()}`)
    } catch (error) {
      externalCss.push(`/* Failed to read ${response.url()}: ${String(error)} */`)
    }
  }
})

let navigationError = null
try {
  await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 })
  await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => undefined)
  await page.waitForTimeout(2500)

  for (let i = 0; i < 4; i += 1) {
    await page.mouse.wheel(0, 1400)
    await page.waitForTimeout(700)
  }
  await page.mouse.wheel(0, -5600)
  await page.waitForTimeout(1000)
} catch (error) {
  navigationError = String(error)
}

const runtime = await page.evaluate(() => {
  const getText = element => (element?.innerText || element?.textContent || '').trim()
  const styleTags = [...document.querySelectorAll('style')].map((node, index) => ({
    index,
    length: node.textContent?.length || 0,
    css: node.textContent || ''
  }))

  const cssom = [...document.styleSheets].map(sheet => {
    try {
      return {
        href: sheet.href || null,
        disabled: sheet.disabled,
        rules: [...sheet.cssRules].map(rule => rule.cssText).join('\n')
      }
    } catch (error) {
      return { href: sheet.href || null, disabled: sheet.disabled, error: String(error), rules: '' }
    }
  })

  const links = [...document.querySelectorAll('link')].map(link => ({
    rel: link.rel,
    href: link.href,
    as: link.as || '',
    type: link.type || ''
  }))

  const scripts = [...document.scripts].map(script => ({
    src: script.src || '',
    type: script.type || '',
    length: script.textContent?.length || 0
  }))

  const images = [...document.images].map(image => ({
    src: image.currentSrc || image.src,
    alt: image.alt || '',
    width: image.naturalWidth,
    height: image.naturalHeight,
    className: image.className || ''
  }))

  const anchors = [...document.querySelectorAll('a')].map(anchor => ({
    text: getText(anchor),
    href: anchor.href,
    className: anchor.className || ''
  }))

  const bodyText = getText(document.body)
  const frameworkMarkers = {
    hasNuxtRoot: Boolean(document.querySelector('#__nuxt')),
    hasVueAppRoot: Boolean(document.querySelector('#app, [data-v-app]')),
    hasVueScopedSelectors: /data-v-[a-f0-9]{6,}/i.test(document.documentElement.outerHTML),
    hasNextRoot: Boolean(document.querySelector('#__next'))
  }

  return {
    title: document.title,
    url: location.href,
    bodyText,
    bodyHtml: document.body.innerHTML,
    fullHtml: document.documentElement.outerHTML,
    styleTags,
    cssom,
    links,
    scripts,
    images,
    anchors,
    frameworkMarkers
  }
})

await page.screenshot({ path: path.join(outDir, 'runtime-fullpage.png'), fullPage: true }).catch(() => undefined)
await browser.close()

const inlineCss = runtime.styleTags.map(item => `/* inline style tag ${item.index}; ${item.length} chars */\n${item.css}`).join('\n\n')
const cssomCss = runtime.cssom.map((item, index) => `/* cssom sheet ${index}: ${item.href || 'inline'} ${item.error || ''} */\n${item.rules}`).join('\n\n')
const allCss = [inlineCss, externalCss.join('\n\n'), cssomCss].filter(Boolean).join('\n\n')

await safeWrite('runtime.html', runtime.fullHtml)
await safeWrite('runtime-body.html', runtime.bodyHtml)
await safeWrite('runtime-body.txt', runtime.bodyText)
await safeWrite('inline-style-tags.css', inlineCss)
await safeWrite('external-css.css', externalCss.join('\n\n'))
await safeWrite('cssom-rules.css', cssomCss)
await safeWrite('extracted-full-runtime-css.css', allCss)

const sourceBodyText = source.html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
const classification = {
  likelyStaticOrSSR: sourceBodyText.length > 500,
  likelyCSRSPA: sourceBodyText.length < 200 && runtime.bodyText.length > 500,
  hasRuntimeInjectedCss: runtime.styleTags.length > 0 || runtime.cssom.some(sheet => !sheet.href && sheet.rules.length > 0),
  notes: []
}

if (navigationError) classification.notes.push(`Navigation error: ${navigationError}`)
if (source.error) classification.notes.push(`Source fetch error: ${source.error}`)
if (runtime.frameworkMarkers.hasVueScopedSelectors) classification.notes.push('Vue scoped data-v-* markers found in runtime HTML/CSS.')
if (runtime.frameworkMarkers.hasNuxtRoot) classification.notes.push('Nuxt root marker found.')
if (runtime.frameworkMarkers.hasVueAppRoot) classification.notes.push('Vue app marker found.')

const manifest = {
  capturedAt: new Date().toISOString(),
  targetUrl,
  source: { ok: source.ok, status: source.status, finalUrl: source.url, htmlBytes: source.html.length, error: source.error || null },
  runtime: {
    title: runtime.title,
    finalUrl: runtime.url,
    textLength: runtime.bodyText.length,
    htmlBytes: runtime.fullHtml.length,
    styleTagCount: runtime.styleTags.length,
    cssomSheetCount: runtime.cssom.length,
    imageCount: runtime.images.length,
    anchorCount: runtime.anchors.length,
    scriptCount: runtime.scripts.length,
    frameworkMarkers: runtime.frameworkMarkers
  },
  classification,
  requests,
  responses,
  images: runtime.images,
  anchors: runtime.anchors,
  links: runtime.links,
  scripts: runtime.scripts
}

await safeWrite('manifest.json', `${JSON.stringify(manifest, null, 2)}\n`)
console.log(JSON.stringify({ ok: !navigationError, targetUrl, outDir, classification, manifest: 'artifacts/manifest.json' }, null, 2))
