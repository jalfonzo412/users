require('dotenv').config()
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  mode: 'spa',
  ssr: false,
  head: {
    title: 'project-name',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'project description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  plugins: ['@/plugins/vuetify'],
  dirs: ['composables'],
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify']
  },
  modules: ['@nuxtjs/google-fonts', '@pinia/nuxt'],
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },
  runtimeConfig: {
    public: {
      API_HOST: process.env.API_HOST,
      API_PORT: process.env.API_PORT,
      API_ROUTE: process.env.API_ROUTE
    }
  }
})
