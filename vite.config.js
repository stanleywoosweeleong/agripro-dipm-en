import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages base path.
// If your repo is https://github.com/<user>/agripro-dipm, the site is served at
// https://<user>.github.io/agripro-dipm/ — so base must be '/agripro-dipm/'.
// Change this to match your actual repository name, or set BASE env var:
//   BASE=/my-repo-name/ npm run build
const base = process.env.BASE || '/agripro-dipm/';

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'AgriPro DIPM — Durian Pest Management',
        short_name: 'AgriPro DIPM',
        description:
          'Integrated Pest Management for durian orchards — pest database, risk simulator, mixing protocols.',
        theme_color: '#059669',
        background_color: '#f0fdf4',
        display: 'standalone',
        orientation: 'portrait',
        scope: base,
        start_url: base,
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // Allow large precaching since this is a data-heavy single-page tool
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            // Cache Gemini Imagen responses opportunistically (NetworkFirst — fresh when online, cached when offline)
            urlPattern: /^https:\/\/generativelanguage\.googleapis\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'gemini-api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ]
});
