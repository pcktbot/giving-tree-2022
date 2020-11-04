module.exports = {
  telemetry: false,
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3001
  },
  head: {
    title: 'giving-tree-2020',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: ['~/assets/theme.scss'],
  loading: '~/components/loading.vue',
  components: true,
  buildModules: ['@nuxtjs/eslint-module'],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true
  },
  axios: {
    browserBaseURL: `//${process.env.API}`
  }
}
