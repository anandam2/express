const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, }
});

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;