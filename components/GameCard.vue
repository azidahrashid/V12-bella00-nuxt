<script setup lang="ts">
defineProps<{
  title: string
  eyebrow: string
  description: string
  href: string
  image: string
}>()
</script>

<template>
  <article class="game-card">
    <img :src="image" :alt="title" loading="lazy" />
    <div class="game-card__body">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <a :href="href">Open category</a>
    </div>
  </article>
</template>
