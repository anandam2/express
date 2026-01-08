var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

/* GET registration form */
router.get('/', (req, res) => {
  res.render('index', { errors: [], oldData: {} });
});

router.post(
  '/register',

  [
    body('name')
      .notEmpty()
      .withMessage('Name must not be empty'),

    body('email')
      .isEmail()
      .withMessage('Please enter a valid email'),

    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
  ],

  (req, res) => {
    const errors = validationResult(req);

  
    if (!errors.isEmpty()) {
      return res.render('index', {
        errors: errors.array(),
        oldData: req.body
      });
    }

    res.render('welcome', {
      name: req.body.name,
      email: req.body.email
    });
  }
);

module.exports = router;