<script setup lang="ts">
import { featuredGames, moreNavigation, primaryNavigation, promotionSlides } from '../data/site-content'

const handleAuthStub = (action: 'login' | 'register') => {
  console.info(`[stub] ${action} backend integration intentionally omitted`)
}
</script>

<template>
  <div class="site-shell">
    <Header :navigation="primaryNavigation" @login="handleAuthStub('login')" @register="handleAuthStub('register')" />

    <main>
      <HeroSection :slides="promotionSlides" />
      <NavigationMenu :primary="primaryNavigation" :secondary="moreNavigation" />

      <section id="live-casino" class="section-block section-block--dark">
        <div class="section-heading">
          <p class="eyebrow">Runtime category scaffold</p>
          <h2>Featured lobbies</h2>
          <p>
            Replace these placeholder cards with approved captured assets after running the extraction script locally.
          </p>
        </div>

        <div class="game-grid">
          <GameCard v-for="game in featuredGames" :key="game.title" v-bind="game" />
        </div>
      </section>

      <section id="events" class="section-block promo-strip">
        <div>
          <p class="eyebrow">이벤트</p>
          <h2>Promotion rail placeholder</h2>
          <p>
            The original site appears to include event and campaign imagery. Keep only permitted, non-sensitive promotional assets in this frontend scaffold.
          </p>
        </div>
        <a class="ghost-link" href="#migration">View migration workflow</a>
      </section>

      <section id="migration" class="section-block migration-notes">
        <div class="section-heading">
          <p class="eyebrow">Migration workflow</p>
          <h2>Capture, clean, then convert</h2>
        </div>
        <ol>
          <li><code>npm run extract -- https://www.bella00.com/</code> captures runtime DOM, style tags, external CSS, screenshots and a manifest.</li>
          <li><code>npm run clean-css</code> removes Vue scoped selectors, obvious comments and duplicate CSS blocks.</li>
          <li><code>npm run convert</code> writes derived content data for this Nuxt scaffold.</li>
        </ol>
      </section>
    </main>

    <Footer />
  </div>
</template>
