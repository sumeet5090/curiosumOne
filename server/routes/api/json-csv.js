const {Router} = require('express')
const router = Router();
const passport = require('passport')
const helper = require('./../../auth/helper')
const JsonCont = require('./../../controllers/json-and-csv')

router.post('/json-to-csv', helper.isAuthenticated, JsonCont.jsonToCsv)
router.post('/csv-to-json', helper.isAuthenticated, JsonCont.csvToJson)

module.exports = router;
