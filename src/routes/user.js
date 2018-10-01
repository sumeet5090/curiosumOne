let router = require('express').Router()
let passport = require('passport')
let localAuth = require('./../auth/local')(passport)
let userController = require('./../controllers/user.controller')

// Passport middlewares
let authMW = passport.authenticate('jwt', {
  session: false
}) // Is a logged in user
let adminMW = passport.authenticate('jwt.admin', {
  session: false
}) // Is a logged in admin
let changeUserInfo = passport.authenticate('jwt.change', {
  session: false
}) // Is a logged in user who wants to change his info or a logged in admin
let notLoggedIn = passport.authenticate('jwt.notloggedin', {
  session: false
})
// Routes

router.get('/get', adminMW, userController.getUsers);
router.get('get/:id', userController.getUser)
router.post('/create', userController.registerUser)
router.post('/login', userController.loginUser)
router.put('/update/:id', changeUserInfo, userController.updateUser)
router.delete('/delete/:id', changeUserInfo, userController.deleteUser)
router.get('/logout', (req, res) => {
  return res.send('Hi')
})
module.exports = router;