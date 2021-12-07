const mongoose = require("mongoose");
const productSchema = require("./Product");

const cartSchema = new mongoose.Schema({
  userId: mongoose.ObjectId,
  products: [productSchema],
});

module.exports = mongoose.model("cart", cartSchema);
