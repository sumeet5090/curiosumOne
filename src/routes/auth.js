import express from 'express'
import passport from 'passport';
require('./../auth/google')(passport)
// require('./../auth/local')(passport)
import {
  checkAuth,
  signJwt
} from './../services/auth.service'

// Local Auth

let router = express.Router()
router.get('/', checkAuth, (req, res) => {
  res.send(req.user)
})
// Google Auth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)
router.get('/google/redirect', passport.authenticate('google', {
  failureRedirect: '/#/login',
}), async (req, res) => {
  let token = await signJwt({_id: req.user._id})
  res.send({
    user: req.user,
    token: token
  })
})

router.get('/token', checkAuth, (req, res) => {
  console.log(req.user)
  res.send({
    msg: "TOKEN HERE"
  })
})
module.exports = router