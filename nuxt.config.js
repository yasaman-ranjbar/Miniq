import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  head: {
    titleTemplate: '%s - مینی کیو',
    htmlAttrs: {
      lang: 'fa'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/fonts/IranSans/iranSans.css",
    // '~/assets/variables.scss',
    "~/assets/css/main.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // "~/plugins/axios.js",
    "~/plugins/vuex-persist.js",
    "~/plugins/formatDate.js",
    "~/plugins/vue-apexchart.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    ['nuxt-moment-jalaali', {
      moment: {
        defaultLocale: 'fa',
        locales: ['fa'],
        timezone: {
          matchZones: ['Iran'],
          startYear: 2000,
          endYear: 2030
        },
        defaultTimezone: 'Asia/Tehran'
      }
    }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth'
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/admin/login', method: 'post', propertyName: 'result.token.access_token' },
          user: { url: '/api/admin/is_login', method: 'get', propertyName: 'result' },
          logout: { url: '/api/admin/logout', method: 'get' },
        },
        tokenRequired: true,
        tokenType: 'Bearer',
        globalToken: true,
        autoFetchUser: true,
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
      callback: '/',
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    headers: {
      'App-Id': 'miniq',
      'App-Key': '781262c8e52384afc08626d3944efe9162790fa8c0384e09347ccdff42eeb30',
    }
  },

  proxy: {
    '/api/': { target: process.env.BASE_URL , pathRewrite: { '^/api/': '/' }, changeOrigin: true }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    rtl: true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#ff3392',
          accent: colors.grey.darken3,
          secondary: '#81D4FA',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor : ['vue-apexchart'],
  }
}
