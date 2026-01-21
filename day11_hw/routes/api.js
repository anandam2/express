const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// SIGNUP API

router.post('/signup', async (req, res) => {

  const { username, email, password } = req.body;

  // username uniqueness
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({
      message: "Username already exists"
    });
  }

  // encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword
  });

  await newUser.save();

  res.status(201).json({
    message: "Signup successful"
  });
});

// LOGIN API

router.post('/login', async (req, res) => {

  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  // create JWT token
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    username: user.username,
    email: user.email,
    token: token
  });
});

module.exports = router;