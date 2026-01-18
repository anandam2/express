var express = require('express');
var router = express.Router();

// Home page
router.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

// Destinations page
router.get('/destination', function(req, res) {
  res.render('destination', { title: 'Destinations' });
});

// Contact page
router.get('/contactus', function(req, res) {
  res.render('contactus', { title: 'Contact Us' });
});

module.exports = router;
