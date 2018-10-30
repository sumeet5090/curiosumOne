const {Router} = require('express')
const router = Router();
const TeamController = require('./../../controllers/team')
const passport = require('passport')
router.get('/', TeamController.getAll)
router.post('/create', TeamController.create)
router.get('/:id', TeamController.getOne)
router.put('/:id', TeamController.updateTeam)
router.delete('/:id', TeamController.deleteTeam)

module.exports = router;