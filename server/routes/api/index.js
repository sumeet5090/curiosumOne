const { Router } = require('express')
const router = Router()
const userRouter = require('./user')
const eventRouter = require('./event')

router.get('/', (req, res) => {
    return res.send({
        status: 'Live',
        version: '1.0.0'
    })
})

router.use('/user', userRouter);
router.use('/event', eventRouter);
module.exports = router;