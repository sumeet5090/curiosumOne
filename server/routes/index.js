const { Router } = require('express')
const passport = require('passport')
const router = Router()
const teamRoute = require('./api/team')

router.get('/auth/google', passport.authenticate('google'), (req, res) => {
    // console.log('Yes this shows up')
})

router.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    return res.redirect('/profile')
})

router.post('/api/logout', (req, res) => {
    // console.log('Logging off', req.user)
    req.logout();
    return res.redirect('/')
})

module.exports = router;