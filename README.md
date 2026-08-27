# Sparkles Packaging — focused static site

A focused five-page static site with no framework and no build step: Home, Products, Services, About, and Contact. Legacy content pages remain available for existing URLs and are intentionally kept out of primary navigation.

## Primary customer journey
- `index.html` — conversion-focused home page
- `products.html` — product catalogue and packaging categories
- `services.html` — printing, branding, sourcing, bulk supply and advisory
- `about.html` — company story, mission and values
- `contact.html` — quote and WhatsApp contact route

## Legacy content retained
- `materials.html` — plain materials and bulk-supply information
- `consultation.html` — packaging guidance and consultation information

These pages remain available so existing links and useful content are not destroyed; they are simply no longer part of the primary navigation.

## Assets
- `assets/styles.css` — shared design system
- `assets/script.js` — shared navigation, WhatsApp, contact form, product filtering and homepage behaviour
- `assets/img/`, `assets/video/` — site media
- root favicon and Apple touch icons

## Run locally
Any static server works:
```bash
python3 -m http.server 8080
```

## Deploy
Static hosting only — no Node server and no build command required. Vercel can serve the project directly as a static site.
