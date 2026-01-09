var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/quotesDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

/* GET home page */
router.get('/', function(req, res) {
  res.render('index', { error: null, success: null });
});

/* POST signup */
router.post('/signup', async function(req, res) {
  const { username, email, password } = req.body;

  if (!username) {
    return res.render('index', { error: "Username is required", success: null });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.render('index', { error: "Invalid email", success: null });
  }

  if (password.length < 8) {
    return res.render('index', { error: "Password must be at least 8 characters", success: null });
  }

  await User.create({ username, email, password });

  res.render('index', { error: null, success: "Thank you for signing up!" });
});

module.exports = router; // ✅ THIS LINE IS CRITICAL