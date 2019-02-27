const router = require('express').Router()
const helper = require('../../auth/helper')
const car = require('../../controllers/car.js')

router.get('/', car.getAll)
router.get('/:team_id/car', car.getForTeam)
router.post('/:team_id/car', helper.allowStaff, car.create)
router.put('/:team_id/car', helper.allowStaff, car.update)
router.delete('/:team_id/car', helper.allowStaff, car.remove)

module.exports = router;