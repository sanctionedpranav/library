const express = require('express')
const router = express.Router()
const Author = require('../modals/author')
// all authors route
router.get('/', (req, res) => {
    res.render('authors/index')
})

// new author route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})

// create author route
// router.post('/', (req, res) => {
//     const author = new Author({
//         name: req.body.name
//     })
//     author.save((err, newAuthor) => {
//         if (err) {
//             res.render('authors/new', ({
//                 author: author,
//                 errorMessage: 'Error creating author'
//             }))
//         }
//         else {
//             // res.redirect(`authors/${newAuthor.id}`)
//             res.redirect(`authors`)
//         }
//     })
// })


router.post('/', async (req, res) => {
    try {
        const author = new Author({
            name: req.body.name
        });
        const newAuthor = await author.save();
        // res.redirect(`authors/${newAuthor.id}`);
        res.redirect('authors');
    } catch (err) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        });
    }
});

module.exports = router