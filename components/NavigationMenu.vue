<script setup lang="ts">
import type { NavItem } from '~/app/data/site-content'

defineProps<{
  primary: NavItem[]
  utilities: NavItem[]
}>()
</script>

<template>
  <section class="nav-menu" aria-label="Site sections">
    <div class="nav-menu__heading">
      <p class="eyebrow">global-icon</p>
      <h2>전체 메뉴</h2>
    </div>

    <div class="nav-menu__grid">
      <template v-for="item in primary" :key="item.to">
        <NuxtLink class="menu-tile" :to="item.to">
          <span>{{ item.icon }}</span>
          <strong>{{ item.label }}</strong>
          <small>{{ item.description }}</small>
        </NuxtLink>
        <NuxtLink v-for="child in item.children || []" :key="child.to" class="menu-tile menu-tile--child" :to="child.to">
          <span>{{ child.icon }}</span>
          <strong>{{ child.label }}</strong>
          <small>{{ child.description }}</small>
        </NuxtLink>
      </template>
      <NuxtLink v-for="item in utilities" :key="item.to" class="menu-tile" :to="item.to">
        <span>{{ item.icon }}</span>
        <strong>{{ item.label }}</strong>
        <small>{{ item.description }}</small>
      </NuxtLink>
    </div>
  </section>
</template>
