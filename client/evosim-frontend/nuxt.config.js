export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'EvoSim',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/png', href: '/ai-favicon.png'}
    ]
  },

  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8000 // default: 3000
  },

  publicRuntimeConfig: {
    serverHost: process.env.SERVER_HOST || 'localhost',
    serverPort: process.env.SERVER_PORT || 5000,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: "@/plugins/vis", mode: "client"},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: [{
      code: 'en',
      file: 'en.js'
    },
      {
        code: 'de',
        file: 'de.js'
      }
    ],
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
