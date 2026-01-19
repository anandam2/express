var express = require('express');
var router = express.Router();
const Product = require('../models/product');


router.get('/products', (req, res) => {
  res.render('addProduct', { product: {}, error: null });
});

router.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = new Product({ name, price, description });

  const validationError = newProduct.validateSync();

  if (validationError) {
    res.render('addProduct', {
      error: validationError.errors,
      product: { name, price, description }
    });
  } else {
    newProduct.save()
      .then(() => res.redirect('/products/list'))
      .catch(err => console.error(err));
  }
});


router.get('/products/list', async (req, res) => {
  const { page = 1, limit = 3 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit)
  };

  try {
    const result = await Product.paginate({}, options);

    res.render('list', {
      data: result.docs,        
      pagination: result
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/products/edit/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.render('update', { product, error: null }))
    .catch(err => console.error(err));
});

router.post('/update_product/:id', (req, res) => {
  const { name, description, price } = req.body;
  const productId = req.params.id;

  const product = new Product({ name, description, price });
  const validationError = product.validateSync();

  if (validationError) {
    product._id = productId;
    res.render('update', { product, error: validationError.errors });
  } else {
    Product.findByIdAndUpdate(productId, { name, description, price })
      .then(() => res.redirect('/products/list'))
      .catch(err => console.error(err));
  }
});


router.get('/products/delete/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.render('delete', { product }))
    .catch(err => console.error(err));
});

router.post('/products/delete/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/products/list'))
    .catch(err => console.error(err));
});

module.exports = router;
const mongoosePaginate = require('mongoose-paginate-v2');