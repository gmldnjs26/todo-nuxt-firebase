import * as FontAwesome from './build/fontawesome'
require('dotenv').config()

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'todo-app',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'hotel-country',
          path: '/hotel/country',
          component: resolve(__dirname, 'pages/search.vue'),
        },
        {
          name: 'hotel-country-id',
          path: '/hotel/country/:id',
          component: resolve(__dirname, 'pages/search.vue'),
        },
        {
          name: 'hotel-country-district-id',
          path: '/hotel/country/:id/district/:id',
          component: resolve(__dirname, 'pages/hub.vue'),
        },
        {
          name: 'hotel-country-district-prefecture',
          path: '/hotel/country/:id/district/:id/prefecture/:id',
          component: resolve(__dirname, 'pages/search.vue'),
        },
        {
          name: 'hotel-country-district-prefecture-zone',
          path: '/hotel/country/:id/district/:id/prefecture/:id/zone/:id',
          component: resolve(__dirname, 'pages/search.vue'),
        },
        {
          name: 'hotel-country-district-prefecture-section-block',
          path: '/hotel/country/:id/district/:id/prefecture/:id/zone/:id/section/:id/block/:id',
          component: resolve(__dirname, 'pages/search.vue'),
        },
        {
          name: 'hotel-station',
          path: '/hotel/station',
          component: resolve(__dirname, 'pages/search.vue'),
        },
        {
          name: 'hotel-station-id',
          path: '/hotel/station/:id',
          component: resolve(__dirname, 'pages/search.vue'),
        },
        {
          name: 'hotel-spot',
          path: '/hotel/spot',
          component: resolve(__dirname, 'pages/search.vue'),
        },
        {
          name: 'hotel-spot',
          path: '/hotel/spot/:id',
          component: resolve(__dirname, 'pages/search.vue'),
        },
        {
          name: 'hotel-search',
          path: '/hotel/search',
          component: resolve(__dirname, 'pages/search.vue'),
        },
      )
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/index.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/firebase.ts', ssr: false },
    // サーバーサイドでは使用できないのでssrはfalseにすること
    { src: '~/plugins/persistedstate.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://composition-api.nuxtjs.org/getting-started/setup
    '@nuxtjs/composition-api/module',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/fontawesome', { component: 'fontAwesome', suffix: true }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // '@nuxtjs/firebase', 타입적용이 어려워서 nuxtjs/firebase는 안쓰는쪽으로함
    // https://i18n.nuxtjs.org
    [
      '@nuxtjs/i18n',
      {
        // 使用する言語の設定
        locales: [
          { code: 'ko', name: 'Korean', iso: 'ko_KR', file: 'ko/index.js' },
          { code: 'ja', name: 'Japanese', iso: 'ja_JP', file: 'ja/index.js' },
        ],
        defaultLocale: 'ko',
        langDir: 'locales/',
        strategy: 'prefix_except_default',
        vueI18n: {
          fallbackLocale: 'ko',
        },
        lazy: true,
        vueI18nLoader: true,
        vuex: false,
      },
    ],
  ],
  // firebase: {
  //   config: {

  //   },
  //   services: {
  //     auth: true, // Just as example. Can be any other service.
  //     firestore: true,
  //     storage: true,
  //   },
  // },
  fontawesome: {
    icons: {
      solid: FontAwesome.solid,
      regular: FontAwesome.regular,
      brands: FontAwesome.brands,
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    FIREBASE_APIKEY: process.env.apiKey,
    FIREBASE_AUTHDOMAIN: process.env.authDomain,
    FIREBASE_PROJECTID: process.env.projectId,
    FIREBASE_STORAGEBUCKET: process.env.storageBucket,
    FIREBASE_MESSAGINGSENDERID: process.env.messagingSenderId,
    FIREBASE_APPID: process.env.appId,
    FIREBASE_MEASURMENTID: process.env.measurementId,
  },
}
