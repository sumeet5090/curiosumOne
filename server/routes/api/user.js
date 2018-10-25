const {Router} = require('express')
const router = Router();
const UserController = require('./../../controllers/user')
const helper = require('./../../auth/helper')
const passport = require('passport')
router.get('/', UserController.getAll)
router.get('/:id/team', UserController.getTeam)
router.get('/:id', UserController.getOne)
router.get('/profile/:username/team', UserController.getTeamByUsername)
router.get('/profile/:username', UserController.getByUsername)
router.put('/update', passport.authenticate('google'), UserController.update)

// router.post('/create', UserController.create)
// router.get('/protected', [passport.authenticate('google')], (req, res) => {
//     return res.send('Protected SHIOTTTTTTTTTTTTTTTTTTTTTTT')
// })
module.exports = router;