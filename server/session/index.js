const session = require('express-session')
const keys = require('./../../config/keys')
module.exports = function (app) {
    app.use(session({
        secret: keys.session.secret,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: keys.session.maxAge }
    }))
}