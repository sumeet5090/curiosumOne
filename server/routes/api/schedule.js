const router = require('express').Router()
const helper = require('../../auth/helper')
const schedule = require('../../controllers/schedule')

router.get('/:sc_id', schedule.getOneSchedule)
router.get('/', schedule.getAllSchedules)
router.post('/', helper.allowStaff, schedule.createSchedule)
router.put('/:sc_id', helper.allowStaff, schedule.updateSchedule)
router.delete('/:sc_id', helper.allowStaff, schedule.deleteSchedule)

module.exports = router;