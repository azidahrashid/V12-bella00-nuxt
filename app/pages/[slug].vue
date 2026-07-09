<script setup lang="ts">
import {
  defaultPage,
  getPageBySlug,
  mainNavigation,
  utilityNavigation
} from '~/app/data/site-content'
import type { LobbyCard } from '~/app/data/site-content'

const route = useRoute()
const authMode = ref<'login' | 'register' | null>(null)
const demoUser = ref('')
const pageNotice = ref('')
const runtimeConfig = useRuntimeConfig()
const resolveAsset = (path: string) => `${runtimeConfig.app.baseURL.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`

const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value.join('/') : String(value || '')
})

const page = computed(() => getPageBySlug(slug.value) || defaultPage(slug.value))

const openAuth = (mode: 'login' | 'register') => {
  authMode.value = mode
}

const closeAuth = () => {
  authMode.value = null
}

const handleSuccess = (username: string) => {
  demoUser.value = username
  pageNotice.value = `${username}님, 데모 상태로 로그인되었습니다.`
  closeAuth()
}

const logout = () => {
  demoUser.value = ''
  pageNotice.value = '데모 로그아웃이 완료되었습니다.'
}

const playCard = (card: LobbyCard) => {
  pageNotice.value = `${card.title} 실행 전 로그인이 필요합니다.`
  openAuth('login')
}

useHead(() => ({
  title: `${page.value.label} - BellaBet - Best Betting Site`,
  meta: [
    { name: 'description', content: page.value.description }
  ]
}))
</script>

<template>
  <div class="site-shell">
    <Header
      :navigation="mainNavigation"
      :utilities="utilityNavigation"
      :active-path="route.path"
      :demo-user="demoUser"
      @login="openAuth('login')"
      @register="openAuth('register')"
      @logout="logout"
    />

    <main>
      <section class="subpage-hero">
        <div>
          <p class="eyebrow">{{ page.eyebrow }}</p>
          <h1>{{ page.title }}</h1>
          <p>{{ page.description }}</p>
          <div class="hero-actions">
            <button class="btn btn--primary" type="button" @click="openAuth('login')">로그인</button>
            <NuxtLink class="btn btn--ghost" to="/메뉴">전체 메뉴</NuxtLink>
          </div>
        </div>
        <img :src="resolveAsset(page.heroImage)" :alt="page.label" />
      </section>

      <section class="notice-bar notice-bar--page" aria-live="polite">
        <strong>{{ page.label }}</strong>
        <span>{{ pageNotice || page.notices[0] }}</span>
        <button type="button" @click="openAuth('register')">회원가입 테스트</button>
      </section>

      <section class="section-block section-block--dark">
        <div class="section-heading section-heading--inline">
          <div>
            <p class="eyebrow">PAGE CONTENT</p>
            <h2>{{ page.label }} 목록</h2>
            <p>카드 클릭과 플레이 버튼이 모두 작동합니다.</p>
          </div>
        </div>

        <div class="game-grid">
          <GameCard v-for="card in page.cards" :key="`${page.path}-${card.title}`" :card="card" require-login @play="playCard" />
        </div>
      </section>

      <section class="section-block information-panel">
        <div>
          <p class="eyebrow">NOTICE</p>
          <h2>페이지 안내</h2>
        </div>
        <ul>
          <li v-for="notice in page.notices" :key="notice">{{ notice }}</li>
        </ul>
      </section>
    </main>

    <Footer />
    <FloatingChat />

    <AuthModal
      v-if="authMode"
      :mode="authMode"
      @close="closeAuth"
      @switch-mode="authMode = $event"
      @success="handleSuccess"
    />
  </div>
</template>
