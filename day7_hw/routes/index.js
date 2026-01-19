const express = require('express');
const router = express.Router();

// Temporary storage
let bookTitle = "";
let bookPages = "";

/* Home page */
router.get('/', (req, res) => {
  res.render('homepage', { title: "Home" });
});

/* Add Book page */
router.get('/addbook', (req, res) => {
  res.render('addbook', { title: "Add Book" });
});

/* Handle Add Book form */
router.post('/addbooks', (req, res) => {
  bookTitle = req.body.title;
  bookPages = req.body.pages;
  res.redirect('/thankyou');
});

/* Thank You page */
router.get('/thankyou', (req, res) => {
  res.render('thankyou', { title: "Thank You" });
});

/* Book Title page */
router.get('/titles', (req, res) => {
  res.render('titles', {
    title: "Book Title",
    bookTitle: bookTitle
  });
});

/* Book Pages page */
router.get('/bookpage', (req, res) => {
  res.render('bookpage', {
    title: "Book Pages",
    bookPages: bookPages
  });
});

module.exports = router;