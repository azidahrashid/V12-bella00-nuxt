export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  dir: {
    pages: 'app/pages',
    assets: 'app/assets'
  },
  css: ['~/app/assets/css/extracted.css'],
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'ko' },
      title: '벨라벳/bellabet - BellaBet - Best Betting Site',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'noindex, nofollow' },
        {
          name: 'description',
          content: 'Nuxt frontend recreation with working routing, navigation, login/register modal, menu pages and static lobby UI.'
        }
      ]
    }
  },
  nitro: {
    preset: process.env.NITRO_PRESET || undefined
  }
})
