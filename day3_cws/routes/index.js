var express = require('express');
var router = express.Router();
var storeName = 'My Book Store';

/* GET home page. */
var books=[
  {title:'The Great Gatsby', author:'F. Scott Fitzgerald'},
  {title:'To Kill a Mockingbird', author:'Harper Lee'},
  {title:'1984', author:'George Orwell'}
]

router.get('/', function(req, res, next) {
  res.render('index', { title: storeName, books: books });
});

module.exports = router;
