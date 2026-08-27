# Sparkles Packaging — plain HTML site

A full rebuild of the site with no framework and no build step: 7 static
HTML pages, one shared stylesheet, one shared script.

## Structure
- `index.html` — home
- `services.html`, `products.html`, `materials.html`, `portfolio.html`,
  `consultation.html`, `contact.html`
- `assets/styles.css` — the whole design system (self-hosted Space Grotesk,
  Inter, and IBM Plex Mono; no external font/CDN calls)
- `assets/script.js` — mobile nav toggle, WhatsApp deep-links, contact form
- `assets/img/`, `assets/video/` — original media, reused as-is
- `favicon.ico` + PNG/Apple touch icons at the root

## Run it locally
Any static server works, e.g.:
```
python3 -m http.server 8080
```
then open `http://localhost:8080`.

## Deploy
Static hosting only — no Node server, no build command. On Vercel: set the
framework to "Other", leave the build command empty, and set the output
directory to the project root (or just drop it in as a static site).

## Design direction
The visual language borrows from the packaging/print trade itself: crop
marks on card corners, a CMYK-style colour bar (swapped for the brand's own
orange/red/blue/ink), and monospace spec-sheet labels — like a job docket
rather than a generic marketing template.
