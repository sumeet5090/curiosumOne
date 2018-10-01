require('dotenv').config()
const createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  cors = require('cors'),
  // // Vue Router history
  // history = require('connect-history-api-fallback'),
  // Auth
  session = require('express-session'),
  passport = require('passport'),
  validator = require('express-validator'),
  mongoose = require('./src/models'),
  mongoStore = require('connect-mongo')(session),
  // Routes
  rootRouter = require('./src/routes/root'),
  authRouter = require('./src/routes/auth'),
  userRouter = require('./src/routes/user'),
  teamRouter = require('./src/routes/team'),
  eventRouter = require('./src/routes/event'),
  notificationRouter = require('./src/routes/notification'),
  // TODO: Caching
  app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())

app.use(validator())
app.use(passport.initialize())
// app.use('/page', express.static(path.join(__dirname, './views')))

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated()
  res.locals.session = req.session
  next()
})

app.use('/', rootRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/team', teamRouter)
app.use('/event', eventRouter)
app.use('/notification', notificationRouter)

// app.use(history())

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
})

module.exports = app