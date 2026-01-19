const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const validateEmail = require('../middleware/validateEmail');
const validatePassword = require('../middleware/validatePassword');

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userEmail) return next();
  res.redirect('/login');
};

// Home route (optional)
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Signup routes
router.get('/signup', (req, res) => {
  res.render('signup', { message: null, error: null });
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.render('signup', { message: 'Passwords do not match', error: null });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', { message: 'Email already exists', error: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Login routes
router.get('/login', (req, res) => {
  res.render('login', { message: null, errors: [] });
});

router.post('/login', [validateEmail, validatePassword], async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.render('login', { message: 'Incorrect Email', errors: [] });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.render('login', { message: 'Incorrect Password', errors: [] });

    req.session.userEmail = user.email;
    res.redirect('/note');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Note page (protected)
router.get('/note', isAuthenticated, (req, res) => {
  res.render('note', { email: req.session.userEmail });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send('Error logging out');
    res.redirect('/login');
  });
});

module.exports = router;