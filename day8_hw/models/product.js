const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2'); // ✅ ADD THIS

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

// ✅ Attach plugin AFTER schema creation
productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);