var express = require('express');
var router = express.Router();

const Book = require('../models/bookModel');

/* ADD BOOK */
router.post('/add_book', (req, res) => {
    let { title, author, price, inStock } = req.body;

    // convert yes/no to boolean
    inStock = inStock === 'yes';

    const book = new Book({ title, author, price, inStock });

    const error = book.validateSync();
    if (error) return res.status(400).json(error.errors);

    book.save()
        .then(() => res.status(201).json({ message: 'Book added' }))
        .catch(() => res.status(500).json({ message: 'Server error' }));
});

/* SHOW ALL BOOKS */
router.get('/get_books', (req, res) => {
    Book.find()
        .then(books => res.json({ books }))
        .catch(() => res.status(500).json({ message: 'Server error' }));
});

/* UPDATE BOOK */
router.put('/update_book/:id', (req, res) => {
    let { title, author, price, inStock } = req.body;

    inStock = inStock === 'yes';

    const book = new Book({ title, author, price, inStock });
    const error = book.validateSync();
    if (error) return res.status(400).json(error.errors);

    Book.findByIdAndUpdate(req.params.id, { title, author, price, inStock })
        .then(() => res.json({ message: 'Book updated' }))
        .catch(() => res.status(500).json({ message: 'Server error' }));
});

/* DELETE BOOK */
router.delete('/delete_book/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(() => res.json({ message: 'Book deleted' }))
        .catch(() => res.status(500).json({ message: 'Server error' }));
});

module.exports = router;