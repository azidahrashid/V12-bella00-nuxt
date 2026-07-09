<script setup lang="ts">
import type { LobbyCard } from '~/app/data/site-content'

const props = defineProps<{
  card: LobbyCard
  requireLogin?: boolean
}>()

const emit = defineEmits<{
  play: [card: LobbyCard]
}>()

const runtimeConfig = useRuntimeConfig()
const resolveAsset = (path: string) => `${runtimeConfig.app.baseURL.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`
</script>

<template>
  <article class="game-card">
    <NuxtLink class="game-card__image" :to="card.to">
      <img :src="resolveAsset(card.image)" :alt="card.title" loading="lazy" />
      <span v-if="card.badge" class="badge">{{ card.badge }}</span>
    </NuxtLink>
    <div class="game-card__body">
      <p class="eyebrow">{{ card.label }}</p>
      <h3>{{ card.title }}</h3>
      <p>{{ card.description }}</p>
      <div class="game-card__actions">
        <NuxtLink class="text-link" :to="card.to">페이지 열기</NuxtLink>
        <button v-if="requireLogin" class="play-button" type="button" @click="emit('play', card)">플레이</button>
      </div>
    </div>
  </article>
</template>
