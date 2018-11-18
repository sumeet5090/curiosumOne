const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
// const redisStore = require('connect-redis')(session)
const keys = require('./../../config/keys')
module.exports = function (app, mongooseConnection) {
    app.use(session({
        store: new mongoStore({
            mongooseConnection: mongooseConnection
        }),
        // store: new redisStore(options: {
        //     foo: 'bar'
        // }),
        secret: keys.session.secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: keys.session.maxAge
        }
    }))
}