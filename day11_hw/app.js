const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json());

app.use('/api', apiRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/loginSystemDB')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

module.exports = app;