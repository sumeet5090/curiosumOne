require('dotenv').config()
const pkg = require('./package')
const path = require('path')
module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      },
      // TODO: My dev meta
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/register-components', '@/plugins/argon-design'],
  router: {
    extendRoutes(routes, resolve){
      // routes.push({
      //   name: 'profile',
      //   path: '/profile',
      //   component: resolve(__dirname, 'pages/profile')
      // })
    },
    middleware: ['ssr-cookie']
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'http://localhost:3000',
    browserBaseURL: '/'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    vendor: ['bootstrap-vue', 'vue-flatpickr-component', 'vue2-transition', 'vue-lazyload',],
    extend(config, ctx) {
      config.resolve.alias['vue'] = path.resolve(__dirname, './node_modules/vue/dist/vue.js')
      config.module.noParse = [/vue\.js/]
      // TODO: Add webpack rules for ttf otf svg scss file parsing
    }
  }
}
