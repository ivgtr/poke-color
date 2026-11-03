import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import type {} from 'vite-ssg'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'GA_KEY')
  return {
    publicDir: 'src/static',
    define: { 'import.meta.env.GA_KEY': JSON.stringify(process.env.GA_KEY || env.GA_KEY || '') },
    plugins: [
      vue(),
      tailwindcss()
    ],
    ssgOptions: { formatting: 'none' }
  }
})
