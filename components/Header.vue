<script setup lang="ts">
import type { NavItem } from '~/app/data/site-content'

const props = defineProps<{
  navigation: NavItem[]
  utilities: NavItem[]
  activePath?: string
  demoUser?: string
}>()

const emit = defineEmits<{
  login: []
  register: []
  logout: []
}>()

const isMenuOpen = ref(false)
const openDropdown = ref<string | null>(null)

const runtimeConfig = useRuntimeConfig()
const resolveAsset = (path: string) => `${runtimeConfig.app.baseURL.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`

const isActive = (item: NavItem) => {
  if (!props.activePath) return false
  if (props.activePath === item.to) return true
  return Boolean(item.children?.some((child) => child.to === props.activePath))
}

const closeMenus = () => {
  isMenuOpen.value = false
  openDropdown.value = null
}
</script>

<template>
  <header class="site-header">
    <div class="header-topline">
      <span>검증된 안전놀이터</span>
      <strong>BELLABET</strong>
      <span>환전무제한 · 베팅무제재 · 라이브 스포츠</span>
    </div>

    <div class="header-main">
      <NuxtLink class="brand" to="/" aria-label="BellaBet home" @click="closeMenus">
        <img :src="resolveAsset('/assets/site/bella-logo.svg')" alt="BELLABET" />
      </NuxtLink>

      <nav class="desktop-nav" aria-label="Primary navigation">
        <div
          v-for="item in navigation"
          :key="item.to"
          class="nav-item"
          :class="{ 'nav-item--active': isActive(item), 'nav-item--has-children': item.children?.length }"
          @mouseenter="openDropdown = item.label"
          @mouseleave="openDropdown = null"
        >
          <NuxtLink :to="item.to" @click="closeMenus">
            <span class="nav-icon">{{ item.icon }}</span>
            {{ item.label }}
          </NuxtLink>

          <div v-if="item.children?.length" class="nav-dropdown" :class="{ 'is-open': openDropdown === item.label }">
            <NuxtLink v-for="child in item.children" :key="child.to" :to="child.to" @click="closeMenus">
              <span>{{ child.icon }}</span>
              <div>
                <strong>{{ child.label }}</strong>
                <small>{{ child.description }}</small>
              </div>
            </NuxtLink>
          </div>
        </div>
      </nav>

      <nav class="utility-nav" aria-label="Utility navigation">
        <NuxtLink v-for="item in utilities" :key="item.to" :to="item.to" @click="closeMenus">
          <span>{{ item.icon }}</span>{{ item.label }}
        </NuxtLink>
      </nav>

      <div class="header-actions">
        <template v-if="demoUser">
          <span class="user-chip">{{ demoUser }}</span>
          <button class="btn btn--ghost btn--sm" type="button" @click="emit('logout')">로그아웃</button>
        </template>
        <template v-else>
          <button class="btn btn--ghost btn--sm" type="button" @click="emit('login')">로그인</button>
          <button class="btn btn--primary btn--sm" type="button" @click="emit('register')">회원가입</button>
        </template>
      </div>

      <button class="mobile-toggle" type="button" :aria-expanded="isMenuOpen" @click="isMenuOpen = !isMenuOpen">
        <span />
        <span />
        <span />
      </button>
    </div>

    <Transition name="menu-fade">
      <div v-if="isMenuOpen" class="mobile-panel">
        <NuxtLink v-for="item in [...navigation, ...utilities]" :key="item.to" :to="item.to" @click="closeMenus">
          <span>{{ item.icon }}</span>
          {{ item.label }}
        </NuxtLink>
        <template v-for="item in navigation" :key="`${item.to}-children`">
          <NuxtLink v-for="child in item.children || []" :key="child.to" :to="child.to" class="mobile-child" @click="closeMenus">
            <span>{{ child.icon }}</span>
            {{ child.label }}
          </NuxtLink>
        </template>
      </div>
    </Transition>
  </header>
</template>
