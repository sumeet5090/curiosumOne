const router = require('express').Router()
const helper = require('../../auth/helper')
const livetimings = require('../../controllers/live-timing')

router.get('/:lt_id', livetimings.getOne)
router.get('/', livetimings.getAll)
router.post('/:team_id', helper.allowStaff, livetimings.create)
router.put('/:lt_id', helper.allowStaff, livetimings.update)
router.delete('/:lt_id', helper.allowStaff, livetimings.remove)

module.exports = router;