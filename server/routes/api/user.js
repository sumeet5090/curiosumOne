const {Router} = require('express')
const router = Router();
const UserController = require('./../../controllers/user')

router.get('/', (req, res) => {
    return res.send({
        message: "user stuff"
    })
})
router.post('/create', UserController.create)

module.exports = router;