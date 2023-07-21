const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        require: true
    }
    ,
    pageCount: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        require: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        require: true
    }
    ,
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        require: true,
        ref: 'Author'
    }
})

module.exports = mongoose.model('Book', bookSchema)