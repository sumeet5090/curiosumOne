const router = require('express').Router()
const helper = require('../../auth/helper')
const techupdates = require('../../controllers/tech-update')

router.get('/:tu_id', techupdates.getOne)
router.get('/', techupdates.getAll)
router.post('/:team_id', helper.allowStaff, techupdates.create)
router.put('/:tu_id', helper.allowStaff, techupdates.update)
router.delete('/:tu_id', helper.allowStaff, techupdates.remove)

module.exports = router;