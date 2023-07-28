const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Book = require('../modals/book')
const uploadPath = path.join('public', Book.coverImageBasePath)
const Author = require('../modals/author')
const imageMimeTypes = ['images/jpeg', 'image/png', 'image/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, true,)
    }
})

// all book route
router.get('/', async (req, res) => {
    const query = Book.find()
    try {
        const books = await Book.find({})
        res.render('books/index', {
            books: books,
            searchOptions: req.query,
        })

    } catch {
        res.redirect('/')
    }
})
// new book route
router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
})
// create book route
router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName: fileName,
        description: req.body.description,
    })

    try {
        const newBook = await book.save()

        // res.redirect(`books/${newBook.id}`)
        res.redirect(`books`)
    } catch {
        if (book.coverImageName != null) {
            removeBookCover(book.coverImageName)
        }
        renderNewPage(res, book, true)
    }
})

function removeBookCover(fileName) {
    fs.unlink(path.join(uploadPath, fileName), (err) => {
        if (err) {
            console.error(err);
        }
    })
}


async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }
        res.render("books/new", params)
        if (hasError) {
            params.errorMessage = 'Error Creating Book'
        }
    } catch {
        res.redirect("/books")
    }
}
module.exports = router