const {Router} = require('express')
const router = Router();
const TeamController = require('./../../controllers/team')

router.post('/create', TeamController.create)

module.exports = router;