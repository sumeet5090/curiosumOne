const { Router } = require('express')
const url = require('url')
const router = Router();
const TeamController = require('./../../controllers/team')
const helper = require('./../../auth/helper')
// GET
router.get('/', TeamController.getAll)
router.get('/:id', TeamController.getOne)
router.get('/:id/user', TeamController.getTeamExpandUser)
router.get('/:id/mini', TeamController.getOneMini)
router.get('/s/d', helper.isCaptainOrAdmin(), (req, res) => {
  return res.send({'x': 'XDDD', user: req.user.role})
})
router.get('/confirmation/:token', TeamController.confirmToken, (req, res) => {
  return res.redirect(url.format({
    pathname: '/info',
    query: res.locals
  }))
})
// POST
router.post('/create', TeamController.create)
router.post('/:id/add/members', helper.isCaptainOrAdmin(), TeamController.addMembers)
router.post('/:id/add/alumnus', helper.isCaptainOrAdmin(), TeamController.addAlumnus)
router.post('/:id/remove/member/:user_id', helper.isCaptainOrAdmin(), TeamController.removeMembers)
router.post('/:id/remove/alumni/:user_id', helper.isCaptainOrAdmin(), TeamController.removeAlumnus)
router.post('/:id/register/event/:event_id', TeamController.linkTeamAndEvent)
router.post('/:id/register/user/:username', TeamController.linkTeamAndUser)
router.post('/:id/register/car/:car_id', TeamController.linkTeamAndCar)
// PUT
router.put('/:id', helper.isCaptainOrAdmin(), TeamController.updateTeam)
router.put('/:id/captain', helper.isCaptainOrAdmin(), TeamController.changeCaptain)
// DELETE
router.delete('/:id', helper.isCaptainOrAdmin(), TeamController.deleteTeam)

module.exports = router;