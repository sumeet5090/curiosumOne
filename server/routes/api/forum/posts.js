const router = require('express').Router()
const posts = require('../../../controllers/posts')
const helper = require('./../../../auth/helper')
// GET
router.get('/', posts.getAll)
router.get('/:id', posts.getOne)

// POST
router.post('/create', helper.isAuthenticated, posts.create)

// PUT
router.put('/:id', helper.isAuthenticated, posts.update)
router.put('/:id/reply', helper.isAuthenticated, posts.reply)

// DELETE
router.delete('/:id', helper.isAuthenticated, posts.remove)

module.exports = router