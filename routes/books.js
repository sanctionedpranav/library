const express = require('express')
const router = express.Router()
const Book = require('../modals/book')
const Author = require('../modals/author')

// all book route
router.get('/', (req, res) => {
    res.send('all books')
})
// new book route
router.get('/new', async (req, res) => {
    try {
        const authors = await Author.find({})
    } catch {

    }
})
// create book route
router.post('/', (req, res) => {
    res.send('create books')

})
module.exports = router