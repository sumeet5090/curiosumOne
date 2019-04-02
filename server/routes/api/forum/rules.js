const router = require('express').Router()
const sectionController = require('../../../controllers/section')

router.get('/sections', sectionController.getAll)

module.exports = router