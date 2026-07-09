<script setup lang="ts">
import {
  heroSlides,
  lobbyCards,
  mainNavigation,
  slotGames,
  utilityNavigation
} from '~/app/data/site-content'
import type { LobbyCard } from '~/app/data/site-content'

const route = useRoute()
const authMode = ref<'login' | 'register' | null>(null)
const demoUser = ref('')
const activeFilter = ref<'all' | 'sports' | 'casino' | 'mini'>('all')
const actionNotice = ref('')

const openAuth = (mode: 'login' | 'register') => {
  authMode.value = mode
}

const closeAuth = () => {
  authMode.value = null
}

const handleSuccess = (username: string) => {
  demoUser.value = username
  actionNotice.value = `${username}님, 데모 상태로 로그인되었습니다.`
  closeAuth()
}

const logout = () => {
  demoUser.value = ''
  actionNotice.value = '데모 로그아웃이 완료되었습니다.'
}

const playCard = (card: LobbyCard) => {
  actionNotice.value = `${card.title} 실행 전 로그인이 필요합니다.`
  openAuth('login')
}

const filteredCards = computed(() => {
  if (activeFilter.value === 'all') return lobbyCards
  if (activeFilter.value === 'sports') return lobbyCards.filter((card) => ['라이브 스포츠', '프리매치'].includes(card.title))
  if (activeFilter.value === 'casino') return lobbyCards.filter((card) => ['라이브 카지노', '슬롯'].includes(card.title))
  return lobbyCards.filter((card) => ['미니게임', '이벤트'].includes(card.title))
})

useHead({
  title: '벨라벳/bellabet - BellaBet - Best Betting Site'
})
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
      <HeroSection :slides="heroSlides" @login="openAuth('login')" @register="openAuth('register')" />

      <section class="notice-bar" aria-live="polite">
        <strong>공지</strong>
        <span>{{ actionNotice || 'BellaBet Nuxt frontend demo. 모든 메뉴, 모달, 카드 링크가 작동하도록 구성되었습니다.' }}</span>
        <button type="button" @click="openAuth('login')">로그인 테스트</button>
      </section>

      <NavigationMenu :primary="mainNavigation" :utilities="utilityNavigation" />

      <section class="section-block section-block--dark">
        <div class="section-heading section-heading--inline">
          <div>
            <p class="eyebrow">MAIN LOBBY</p>
            <h2>게임 로비</h2>
            <p>원본의 상단 메뉴와 로비 카드 흐름을 Nuxt 컴포넌트로 재구성했습니다.</p>
          </div>
          <div class="filter-tabs" role="tablist" aria-label="Lobby filter">
            <button type="button" :class="{ 'is-active': activeFilter === 'all' }" @click="activeFilter = 'all'">전체</button>
            <button type="button" :class="{ 'is-active': activeFilter === 'sports' }" @click="activeFilter = 'sports'">스포츠</button>
            <button type="button" :class="{ 'is-active': activeFilter === 'casino' }" @click="activeFilter = 'casino'">카지노</button>
            <button type="button" :class="{ 'is-active': activeFilter === 'mini' }" @click="activeFilter = 'mini'">미니게임</button>
          </div>
        </div>

        <div class="game-grid">
          <GameCard v-for="card in filteredCards" :key="card.title" :card="card" require-login @play="playCard" />
        </div>
      </section>

      <section class="section-block promo-strip">
        <div>
          <p class="eyebrow">EVENT</p>
          <h2>웰컴 이벤트와 캐시백 프로모션</h2>
          <p>이벤트 CTA는 실제 신청 대신 UI 상태를 업데이트합니다.</p>
        </div>
        <div class="promo-actions">
          <NuxtLink class="btn btn--primary" to="/이벤트">이벤트 보기</NuxtLink>
          <button class="btn btn--ghost" type="button" @click="actionNotice = '이벤트 신청 데모가 접수되었습니다.'">신청 테스트</button>
        </div>
      </section>

      <section class="section-block section-block--dark">
        <div class="section-heading">
          <p class="eyebrow">SLOT PREVIEW</p>
          <h2>슬롯 썸네일</h2>
          <p>검색 결과에서 확인되는 슬롯 카드 구조를 로컬 SVG 썸네일로 대체했습니다.</p>
        </div>
        <div class="game-grid game-grid--small">
          <GameCard v-for="card in slotGames" :key="card.title" :card="card" require-login @play="playCard" />
        </div>
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
