export default {
  srcDir: 'src/',
  mode: 'universal',
  target: 'static',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fcfc67' },
  /*
   ** Global CSS
   */
  css: [
    'ress',
    {
      src: '~/assets/styles/scss/styles.scss',
      lang: 'scss'
    }
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true
      }
    ],
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  tailwindcss: {
    configPath: '../tailwind.config.js',
    cssPath: '~/assets/styles/css/tailwind.css',
    exposeConfig: false
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    'nuxt-clipboard2',
    'portal-vue/nuxt',
    'nuxt-webfontloader'
  ],
  styleResources: {
    scss: ['~/assets/styles/scss/functions.scss']
  },
  webfontloader: {
    google: {
      families: ['Passion+One:wght@700&display=swap']
    }
  },
  generate: {
    fallback: true
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  router: {
    base: '/'
  }
}
