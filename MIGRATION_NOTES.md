# Migration notes

The uploaded project was only a generic scaffold, so it did not match the original BellaBet visual language. This update replaces the scaffold with a black/neon-green UI, the visible Korean menu hierarchy, working modal UI and Nuxt dynamic pages.

Remote protected assets from bella00.com were not downloaded into this project. Local SVG replacements are provided under `public/assets/site/` so the project is self-contained and safe for GitHub Pages.

Implemented working frontend interactions:

- Header dropdown menus
- Mobile menu toggle
- Login modal
- Register modal
- Auth form validation
- Demo logged-in/logout state
- Card click navigation
- Play button opening login modal
- Event CTA notification state
- Floating chat demo

Not implemented by design:

- Real login/session backend
- Wallet, payment, deposit or withdrawal APIs
- Real betting placement
- Real casino/slot game provider embeds
- LiveChat third-party script
