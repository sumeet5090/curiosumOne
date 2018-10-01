import express from 'express'

let router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'OK',
        apiVersion: "0.0.2"
    })
})
module.exports = router