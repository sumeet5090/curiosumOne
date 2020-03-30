const router = require('express').Router()
const userRouter = require('./user')
const eventRouter = require('./event')
const teamRouter = require('./team')
const jsonAndCsv = require('./json-csv')

router.get('/', (req, res) => {
    return res.send({
        status: 'Live',
        version: '2.0.0'
    })
})

router.use('/event', eventRouter)
router.use('/io', require('./io'))
router.use('/user', userRouter)
router.use('/team', teamRouter)
router.use('/json-and-csv', jsonAndCsv)

module.exports = router
