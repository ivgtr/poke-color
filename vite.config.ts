import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import type {} from 'vite-ssg'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'GA_KEY')
  return {
    publicDir: 'src/static',
    define: { 'import.meta.env.GA_KEY': JSON.stringify(process.env.GA_KEY || env.GA_KEY || '') },
    plugins: [
      vue(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        filename: 'sw.js',
        manifest: {
          name: 'PokéColor',
          short_name: 'PokéColor',
          description: 'あのポケモンの色を使ってみたいと思ったことはありませんか？このサイトでは、あなたの好きなポケモンのカラーコードを自由に入手することができます。',
          lang: 'ja',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#ffffff',
          icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,ico}'],
          navigateFallback: 'index.html',
          navigateFallbackDenylist: [/^\/(?!$)/],
          cleanupOutdatedCaches: true
        }
      })
    ],
    ssgOptions: { formatting: 'none' }
  }
})
