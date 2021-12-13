const mongoose = require("mongoose");
const { productSchema } = require("./Product");

const cartSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  products: [productSchema],
});

module.exports = mongoose.model("cart", cartSchema);
