const {Router} = require('express')
const passport = require('passport')
const router = Router()
router.get('/auth/google', passport.authenticate('google'), (req, res) => {
    console.log('Suppp')
})
router.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    console.log('HAHAHHAHAHHA LOGGED IN', req.user)
    res.redirect('/profile')
})

module.exports = router;