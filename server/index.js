
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const passportInitialize = require('./auth/passport')
const indexRouter = require('./routes')
const teamRouter = require('./routes/api/team')
const database = require('./database')
const session = require('./session')
const app = express()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  // Body parser
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  // Database
  database()
  // Session
  await session(app)
  // Passport
  passportInitialize(app)
  // Auth middlewares
  app.use('/', indexRouter)
  app.use('/team', teamRouter)
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
