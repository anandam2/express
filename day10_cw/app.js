const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/tech_store')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// ✅ THIS IS VERY IMPORTANT
module.exports = app;