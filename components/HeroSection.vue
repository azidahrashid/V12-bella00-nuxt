<script setup lang="ts">
const props = defineProps<{
  slides: Array<{ badge: string; title: string; subtitle: string; body: string; image: string }>
}>()

const emit = defineEmits<{
  login: []
  register: []
}>()

const activeIndex = ref(0)
const runtimeConfig = useRuntimeConfig()
const resolveAsset = (path: string) => `${runtimeConfig.app.baseURL.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`

let intervalId: number | undefined
onMounted(() => {
  intervalId = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % Math.max(props.slides.length, 1)
  }, 5500)
})
onBeforeUnmount(() => window.clearInterval(intervalId))
</script>

<template>
  <section id="top" class="hero-section">
    <div class="hero-copy">
      <p class="eyebrow">{{ props.slides[activeIndex]?.badge }}</p>
      <h1>{{ props.slides[activeIndex]?.title }}</h1>
      <h2>{{ props.slides[activeIndex]?.subtitle }}</h2>
      <p>{{ props.slides[activeIndex]?.body }}</p>
      <div class="hero-actions">
        <button class="btn btn--primary" type="button" @click="emit('register')">회원가입</button>
        <button class="btn btn--ghost" type="button" @click="emit('login')">로그인</button>
      </div>
      <div class="hero-dots" aria-label="Hero slides">
        <button
          v-for="(_, index) in props.slides"
          :key="index"
          type="button"
          :class="{ 'is-active': activeIndex === index }"
          :aria-label="`Go to slide ${index + 1}`"
          @click="activeIndex = index"
        />
      </div>
    </div>

    <div class="hero-visual">
      <img :src="resolveAsset(props.slides[activeIndex]?.image || '/assets/site/hero-neon.svg')" alt="BellaBet hero visual" />
      <div class="hero-stat hero-stat--one">
        <span>LIVE</span>
        <strong>24H</strong>
      </div>
      <div class="hero-stat hero-stat--two">
        <span>CASINO</span>
        <strong>HOT</strong>
      </div>
    </div>
  </section>
</template>
