# AgriPro DIPM — Durian Integrated Pest Management

A bilingual-ready, installable PWA for durian orchard pest management.
Built with **React 18 + Vite + Tailwind CSS** and `vite-plugin-pwa` for true offline support.

## What you get

- **Real PWA** — installable on Android, iOS, desktop. Works offline after first visit.
- **Production Tailwind** — purged, minified, no CDN warning.
- **Auto-deploy to GitHub Pages** via GitHub Actions on every push to `main`.
- **AI illustrations powered by [Pollinations.ai](https://pollinations.ai)** — free, no API key, no signup required. Images are cached on-device after first generation, so they work offline.

---

## First-time setup (5 minutes)

You need [Node.js](https://nodejs.org/) v18+ installed.

```bash
# Install dependencies (only needed once)
npm install
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173`. Edits to `src/App.jsx` hot-reload instantly.

## Production build (preview locally)

```bash
npm run build
npm run preview
```

The `preview` server runs the built `dist/` folder — useful for testing the service worker and PWA install prompts (those only activate in production builds).

---

## Deploying to GitHub Pages

### 1. Create the repo

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/agripro-dipm.git
git push -u origin main
```

### 2. Enable GitHub Pages

On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

That's it. The included workflow at `.github/workflows/deploy.yml` builds and publishes automatically on every push to `main`. Your site goes live at:

```
https://<your-username>.github.io/<repo-name>/
```

### Different repo name?

The workflow auto-detects your repo name and sets Vite's `base` accordingly. If you want a custom name or a user/org page (`<user>.github.io`), edit `vite.config.js`:

```js
const base = process.env.BASE || '/your-repo-name/';
// Or for <user>.github.io (root domain):
const base = process.env.BASE || '/';
```

---

## Installing on a phone (Android / iOS)

**Android (Chrome):** open the deployed URL → "Install app" prompt appears, or use the three-dot menu → "Add to Home screen".

**iOS (Safari):** open the URL → Share button → "Add to Home Screen".

Once installed, the app launches like a native app, works offline (after first visit), and updates automatically when you push new versions.

---

## Project structure

```
agripro-dipm/
├── .github/workflows/deploy.yml   # CI: auto-build & deploy on push to main
├── public/                        # PWA icons, favicon, robots.txt
├── src/
│   ├── App.jsx                    # Main app (all logic, all data)
│   ├── main.jsx                   # React entry + service worker registration
│   └── index.css                  # Tailwind directives + safe-area handling
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js                 # Vite + PWA manifest config
```

## Updating the app

1. Edit `src/App.jsx`.
2. `git add . && git commit -m "your message" && git push`.
3. GitHub Action builds and deploys (~1–2 min).
4. Users get the new version automatically on next launch (service worker auto-updates).
