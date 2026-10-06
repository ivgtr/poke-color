import { ViteSSG } from 'vite-ssg/single-page'
import App from './App.vue'
import './assets/styles/css/tailwind.css'
import './assets/styles/scss/styles.scss'

export const createApp = ViteSSG(App, undefined, { hydration: true, useHead: false })

if (!import.meta.env.SSR) {
  const id = import.meta.env.GA_KEY
  if (/^G-[A-Z0-9]+$/.test(id)) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
    document.head.appendChild(script)
    const analyticsWindow = window as Window & { dataLayer?: unknown[] }
    const dataLayer = analyticsWindow.dataLayer ||= []
    const gtag: (...args: unknown[]) => void = function () {
      // eslint-disable-next-line prefer-rest-params -- gtag.js requires an Arguments object
      dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', id)
  }
}
