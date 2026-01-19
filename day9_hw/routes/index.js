const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// --- Redirect root / to login ---
router.get('/', (req, res) => {
  res.redirect('/login');
});

// --- Signup Routes ---
router.get('/signup', (req, res) => {
  res.render('signup', { message: null });
});

router.post('/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.render('signup', { message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', { message: 'Email already exists' });
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

// --- Login Routes ---
router.get('/login', (req, res) => {
  res.render('login', { message: null });
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.render('login', { message: 'Incorrect Email' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.render('login', { message: 'Incorrect Password' });

    req.session.userEmail = user.email;
    res.redirect('/secret');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// --- Middleware to protect secret page ---
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userEmail) return next();
  res.redirect('/login');
};

const isEventcoEmail = (req, res, next) => {
  if (req.session.userEmail && req.session.userEmail.endsWith('@eventco.com')) return next();
  res.send('Access denied. You must use an @eventco.com email.');
};

// --- Secret Page ---
router.get('/secret', isAuthenticated, isEventcoEmail, (req, res) => {
  res.render('secret', { email: req.session.userEmail });
});

// --- Logout ---
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send('Error logging out');
    res.redirect('/login');
  });
});

module.exports = router;