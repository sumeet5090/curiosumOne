const pkg = require('./package')
const path = require('path')
const result = require('dotenv').config({ path: path.join(__dirname, '.env') })
module.exports = {
  mode: 'universal',
  dev: (process.env.NODE_ENV !== 'production'),
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
    },
    {
      rel: 'stylesheet',
      href: "https://fonts.googleapis.com/css?family=Oswald"
    }
  ]
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
  css: [
    
  ],
  env: {
    ...result
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/register-components', '@/plugins/argon-design', {
    src: '@/plugins/webFontLoader.js',
    ssr: false
  }],
  router: {
    extendRoutes(routes, resolve) {
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
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { path: './.env' }]
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'http://localhost:3000',
    browserBaseURL: '/',
    defaults: {
      headers: {
        post: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }
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
      
    }
  }
}
