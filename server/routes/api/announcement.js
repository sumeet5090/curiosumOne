const router = require('express').Router()
const helper = require('../../auth/helper')
const announcement = require('../../controllers/announcement')

router.get('/:annc_id', announcement.getOne)
router.get('/', announcement.getAll)
router.post('/', helper.allowStaff, announcement.create)
router.put('/:annc_id', helper.allowStaff, announcement.update)
router.delete('/:annc_id', helper.allowStaff, announcement.remove)

module.exports = router;