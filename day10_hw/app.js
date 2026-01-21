var express = require('express');
var mongoose = require('mongoose');
var apiRouter = require('./routes/api');

var app = express();

// read json from postman
app.use(express.json());

// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// api routes
app.use('/api', apiRouter);

// start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;