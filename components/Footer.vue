<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const resolveAsset = (path: string) => `${runtimeConfig.app.baseURL.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`
</script>

<template>
  <footer class="site-footer">
    <div>
      <img :src="resolveAsset('/assets/site/bella-logo.svg')" alt="BELLABET" />
      <p>© 2007-2026 BELLABET. Nuxt frontend recreation.</p>
    </div>
    <p class="footer-note">
      This project includes UI, routing, modal validation and static demo states only. Backend authentication, payment, wallet, betting and third-party game APIs are intentionally not included.
    </p>
  </footer>
</template>
