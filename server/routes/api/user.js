const {Router} = require('express')
const router = Router();
const UserController = require('./../../controllers/user')
const passport = require('passport')
// GET
router.get('/', UserController.getAll)
router.get('/:id/team', UserController.getTeam)
router.get('/:id', UserController.getOne)
router.get('/profile/:username/team', UserController.getTeamByUsername)
router.get('/profile/:username', UserController.getByUsername)
// POST
// PUT
router.put('/update', passport.authenticate('google'), UserController.update)
//DELETE
module.exports = router;