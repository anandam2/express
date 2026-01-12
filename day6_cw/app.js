const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product"); // ✅ correct

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/groceryDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.render("addProduct");
});

app.post("/add-product", async (req, res) => {
  const { name, quantity, price } = req.body;
  await Product.create({ name, quantity, price });
  res.redirect("/products");
});

app.get("/products", async (req, res) => {
  const products = await Product.find()
    .sort({ price: 1 })
    .limit(5);

  res.render("productList", { products });
});

module.exports = app;