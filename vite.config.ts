import react from '@vitejs/plugin-react'
import hoverMediaFeature from 'postcss-hover-media-feature'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const appBasePath = env.VITE_APP_BASE_PATH ?? '/'

  return {
    base: appBasePath,
    // :hover nur auf Geräten mit echtem Hover, sonst bleibt er auf Touch nach dem Tippen hängen
    css: { postcss: { plugins: [hoverMediaFeature()] } },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['gin-favicon.png', 'apple-touch-icon.png'],
        manifest: {
          name: '4lpha Web App',
          short_name: '4lpha',
          lang: 'de',
          start_url: appBasePath,
          scope: appBasePath,
          display: 'standalone',
          icons: [
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          globPatterns: ['**/*.{js,css,html,woff2}'],
          navigateFallback: `${appBasePath}index.html`,
          // Andere Pages-Projekte auf demselben Origin dürfen nicht mit unserer index.html beantwortet werden
          navigateFallbackDenylist: [/^\/projekt1\//, /^\/projekt2\//],
        },
        devOptions: { enabled: true, type: 'module' },
      }),
    ],
  }
})
