const router = require('express').Router()
const userRouter = require('./user')
const eventRouter = require('./event')
const teamRouter = require('./team')

router.get('/', (req, res) => {
    return res.send({
        status: 'Live',
        version: '1.0.0'
    })
})
router.use('/user', userRouter)
router.use('/event', eventRouter)
router.use('/team', teamRouter)
router.use('/forum', require('./../api/forum/rules'))
module.exports = router