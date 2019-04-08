
const express = require('express')
const fileUpload = require('express-fileupload')
const consola = require('consola')
require('./prototypes')
const { Nuxt, Builder } = require('nuxt')
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
// Init Nuxt.js
const passportInitialize = require('./auth/passport')
const indexRouter = require('./routes')
const apiRouter = require('./routes/api')
const database = require('./database')
const session = require('./session')
const app = express()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
app.set('port', port)

function print (path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split(thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString().replace('\\/?', '').replace('(?=\\/|$)', '$').match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
    return match ? match[1].replace(/\\(.)/g, '$1').split('/') : '<complex:' + thing.toString() + '>';
  }
}

async function start() {
  const nuxt = new Nuxt(config)
  // Build only in dev mode
  if (config.dev) {
    const builder = await new Builder(nuxt)
    await builder.build()
  }
  // Body parser
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())
  // Database
  let dbConn = database()
  // Session
  
  session(app, dbConn)
  // Passport
  passportInitialize(app)
  // Auth middlewares
  // File upload
  app.use('/', indexRouter)
  app.use('/api', apiRouter)
  app._router.stack.forEach(print.bind(null, []))
  // Give nuxt middleware to express
  app.use(nuxt.render)
  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()