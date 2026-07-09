<script setup lang="ts">
defineProps<{
  navigation: Array<{ label: string; href: string }>
}>()

const emit = defineEmits<{
  login: []
  register: []
}>()
</script>

<template>
  <header class="site-header">
    <a class="brand" href="#top" aria-label="BellaBet scaffold home">
      <img src="/assets/placeholders/bella-logo.svg" alt="BellaBet" />
    </a>

    <nav class="desktop-nav" aria-label="Primary navigation">
      <a v-for="item in navigation" :key="item.label" :href="item.href">{{ item.label }}</a>
    </nav>

    <div class="header-actions">
      <button class="btn btn--ghost" type="button" @click="emit('login')">로그인</button>
      <button class="btn btn--primary" type="button" @click="emit('register')">회원가입</button>
    </div>
  </header>
</template>
