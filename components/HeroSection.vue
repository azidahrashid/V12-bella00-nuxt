<script setup lang="ts">
defineProps<{
  slides: Array<{ title: string; body: string; cta: string }>
}>()
</script>

<template>
  <section id="top" class="hero-section">
    <div class="hero-copy">
      <p class="eyebrow">BellaBet / Bellabet</p>
      <h1>Nuxt frontend scaffold for permitted migration work</h1>
      <p>
        This scaffold reproduces the broad landing-page structure while leaving sensitive backend behaviour as explicit development stubs.
      </p>
      <div class="hero-actions">
        <a class="btn btn--primary" href="#live-casino">Explore layout</a>
        <a class="btn btn--ghost" href="#migration">Run migration scripts</a>
      </div>
    </div>

    <div class="hero-panel" aria-label="Promotion placeholders">
      <article v-for="slide in slides" :key="slide.title" class="hero-card">
        <span>{{ slide.cta }}</span>
        <h2>{{ slide.title }}</h2>
        <p>{{ slide.body }}</p>
      </article>
    </div>
  </section>
</template>
