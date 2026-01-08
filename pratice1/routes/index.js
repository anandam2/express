var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/landpage', function(req, res, next) {
  res.render('landpage');
});
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});
/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});
module.exports = router;
