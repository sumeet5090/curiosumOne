const router = require('express').Router()
const helper = require('../../auth/helper')
const staticschedules = require('../../controllers/static-schedule.js')

router.get('/', staticschedules.getAll)
router.get('/:st_id', staticschedules.getOne)
router.get('/:team_id', staticschedules.getOneForEventTeam)
router.post('/:team_id', helper.allowStaff, staticschedules.create)
router.put('/:st_id', helper.allowStaff, staticschedules.update)
router.delete('/:st_id', helper.allowStaff, staticschedules.remove)

module.exports = router;