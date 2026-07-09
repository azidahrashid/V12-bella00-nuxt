<script setup lang="ts">
defineProps<{
  primary: Array<{ label: string; href: string }>
  secondary: Array<{ label: string; href: string }>
}>()
</script>

<template>
  <section class="nav-menu" aria-label="Site sections">
    <div class="nav-menu__group">
      <p class="eyebrow">global-icon</p>
      <a v-for="item in primary" :key="item.label" :href="item.href">{{ item.label }}</a>
    </div>
    <div class="nav-menu__group nav-menu__group--secondary">
      <p class="eyebrow">더보기</p>
      <a v-for="item in secondary" :key="item.label" :href="item.href">{{ item.label }}</a>
    </div>
  </section>
</template>
