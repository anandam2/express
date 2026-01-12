const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

/* MongoDB */
mongoose.connect("mongodb://127.0.0.1:27017/shopStock")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* Home */
app.get("/", async (req, res) => {
  const products = await Product.find();
  res.render("index", {
    products,
    total: products.length
  });
});

/* Add Product */
app.post("/add-product", async (req, res) => {
  const { name, quantity, price } = req.body;
  await Product.create({ name, quantity, price });
  res.redirect("/");
});

module.exports = app;