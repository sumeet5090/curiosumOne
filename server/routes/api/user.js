const {Router} = require('express')
const router = Router();
const UserController = require('./../../controllers/user')
const passport = require('passport')
// GET
router.get('/', UserController.getAll)
router.get('/:id/team', UserController.getTeam)
router.get('/:id', UserController.getOne)
router.get('/email/:email', UserController.getOneByEmail)
router.get('/profile/:username/team', UserController.getTeamByUsername)
router.get('/profile/:username', UserController.getByUsername)
router.get('/:id/notifications', UserController.getNotifications)

router.post('/jeff', async function(req, res) {
    console.log(req.body.test_array)
})
// POST
// router.post('/:id/:team_id/confirmation', UserController.confirmToken)
// router.post('/:id/:team_id/resend', UserController.resendToken)

// PUT
router.put('/update', passport.authenticate('google'), UserController.update)
//DELETE
module.exports = router;