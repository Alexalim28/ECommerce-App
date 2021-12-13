const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  imgUrl: String,
  description: String,
  price: Number,
  qtyInStock: Number,
});

const Product = mongoose.model("product", productSchema);

module.exports = { productSchema, Product };
