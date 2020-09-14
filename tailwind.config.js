/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  theme: {},
  variants: {
    boxShadow: ['hover']
  },
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/components/**/*.vue',
      './src/layouts/**/*.vue',
      './src/pages/**/*.vue',
      './src/plugins/**/*.js',
      './src/nuxt.config.js'
    ]
  }
}
