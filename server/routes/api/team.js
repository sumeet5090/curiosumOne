const { Router } = require('express')
const router = Router();
const TeamController = require('./../../controllers/team')
const passport = require('passport')

const Event = require('./../../models/event.model')
const Announcement = require('./../../models/announcement.model')
const Team = require('./../../models/team.model')

router.get('/', TeamController.getAll)
router.post('/create', TeamController.create)
router.post('/:id/register/event/:event_id', TeamController.linkTeamAndEvent)
router.post('/:id/register/user/:username', TeamController.linkTeamAndUser)
router.get('/:id', TeamController.getOne)
router.put('/:id', TeamController.updateTeam)
router.delete('/:id', TeamController.deleteTeam)

module.exports = router;