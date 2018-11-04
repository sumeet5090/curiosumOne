const { Router } = require('express')
const router = Router();
const TeamController = require('./../../controllers/team')
const passport = require('passport')
// GET
router.get('/', TeamController.getAll)
router.get('/:id', TeamController.getOne)
// POST
router.post('/create', TeamController.create)
router.post('/:id/register/event/:event_id', TeamController.linkTeamAndEvent)
router.post('/:id/register/user/:username', TeamController.linkTeamAndUser)
router.post('/:id/register/car/:car_id', TeamController.linkTeamAndCar)
// PUT
router.put('/:id', TeamController.updateTeam)
// DELETE
router.delete('/:id', TeamController.deleteTeam)

module.exports = router;