export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  css: ['~/app/assets/css/extracted.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'ko' },
      title: 'BellaBet Nuxt Scaffold',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'noindex, nofollow' },
        {
          name: 'description',
          content: 'Development scaffold for a permitted BellaBet website migration to Nuxt.'
        }
      ]
    }
  },
  nitro: {
    preset: process.env.NITRO_PRESET || undefined
  }
})
