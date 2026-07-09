# bella00-nuxt-recreation

Nuxt recreation package for `https://www.bella00.com/` with a darker neon-green BellaBet visual system, working local routing, login/register modal UI, dropdown/mobile navigation, demo chat widget, lobby cards and category pages.

## What was improved

- Replaced the earlier placeholder scaffold with a BellaBet-style black/green landing page.
- Added working Nuxt links for the visible menu structure.
- Added dynamic page routing through `app/pages/[slug].vue`.
- Added login and registration modal components with client-side validation.
- Added demo authenticated state, logout, play-button modal behavior and notification bars.
- Added local SVG assets so the project can run without hotlinking protected remote images.
- Added a floating chat UI demo.
- Updated `package.json` with `generate` and `pages:build` scripts.

## Important scope note

This is a frontend-only recreation. It intentionally does not include real authentication, wallet, payment, betting, casino game execution, affiliate tracking or private backend/API integration. Connect only systems that you own or are authorized to use.

## Project structure

```txt
bella00-nuxt/
├─ app.vue
├─ nuxt.config.ts
├─ package.json
├─ app/
│  ├─ assets/css/extracted.css
│  ├─ data/site-content.ts
│  └─ pages/
│     ├─ index.vue
│     └─ [slug].vue
├─ components/
│  ├─ AuthModal.vue
│  ├─ FloatingChat.vue
│  ├─ Footer.vue
│  ├─ GameCard.vue
│  ├─ Header.vue
│  ├─ HeroSection.vue
│  └─ NavigationMenu.vue
└─ public/assets/site/
   ├─ bella-logo.svg
   ├─ hero-neon.svg
   ├─ promo-banner.svg
   └─ cards/*.svg
```

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Nuxt, usually `http://localhost:3000`.

## Static build for GitHub Pages

For a user/organization site repository such as `username.github.io`:

```bash
npm run generate
```

For a project repository such as `username.github.io/bella00-nuxt`, set the base URL before generating:

```bash
NUXT_APP_BASE_URL=/bella00-nuxt/ npm run generate
```

Then publish the generated `.output/public` directory to GitHub Pages.

## Where to edit menu/pages

Edit `app/data/site-content.ts`.

- `mainNavigation` controls top navigation and dropdowns.
- `utilityNavigation` controls customer center/menu buttons.
- `pages` controls the content rendered by `app/pages/[slug].vue`.
- `lobbyCards` and `slotGames` control home-page cards.

## Modal behavior

`components/AuthModal.vue` handles:

- login mode
- register mode
- required field validation
- password confirmation validation
- switch between login/register
- Escape key and backdrop close
- emitting demo success state to the parent page

No real credential storage or session cookie is created.
