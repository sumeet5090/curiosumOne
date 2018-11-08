const {Router} = require('express')
const router = Router();
const passport = require('passport')
const helper = require('./../../auth/helper')
const UserCont = require('./../../controllers/user')
// GET
router.get('/', UserCont.getAll)
router.get('/:id/team', UserCont.getTeam)
router.get('/:id', UserCont.getOne)
router.get('/email/:email', UserCont.getOneByEmail)
router.get('/profile/:username/team', UserCont.getTeamByUsername)
router.get('/profile/:username', UserCont.getByUsername)
router.get('/:id/notifications', UserCont.getNotifications)

// POST
router.post('/addrole', helper.isAdmin(), UserCont.addRole)
router.post('/removerole', helper.isAdmin(), UserCont.removeRole)

// router.post('/:id/:team_id/confirmation', UserCont.confirmToken)
// router.post('/:id/:team_id/resend', UserCont.resendToken)

// PUT
router.put('/update', helper.isAuthenticated, UserCont.update)
//DELETE
module.exports = router;