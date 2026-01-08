var express = require('express');
var router = express.Router();

/* ---------- Helper Functions ---------- */

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  return password && password.length >= 8;
};

/* ---------- Middleware ---------- */

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  req.validationErrors = req.validationErrors || [];

  if (!isValidEmail(email)) {
    req.validationErrors.push({ msg: 'Invalid email address' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  req.validationErrors = req.validationErrors || [];

  if (!isValidPassword(password)) {
    req.validationErrors.push({ msg: 'Password must be at least 8 characters' });
  }

  next();
};

/* ---------- Routes ---------- */

router.get('/', (req, res) => {
  res.render('index', { errors: [] });
});

router.post(
  '/join',
  validateEmail,
  validatePassword,
  (req, res) => {

    // ❌ If validation errors exist
    if (req.validationErrors && req.validationErrors.length > 0) {
      return res.render('index', {
        errors: req.validationErrors
      });
    }

    // ✅ If BOTH email and password are valid
    res.render('welcome', {
      email: req.body.email
    });
  }
);

module.exports = router;