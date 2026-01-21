const express = require('express');
const mongoose = require('mongoose');

const apiRoutes = require('./routes/api');

const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api', apiRoutes);

// mongodb connectio
mongoose.connect('mongodb://127.0.0.1:27017/accountDB')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});

module.exports = app;