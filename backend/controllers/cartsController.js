const Cart = require("../models/Cart");

const getCartController = async (req, res) => {
  try {
    const cart = await Cart.findOne({ createdBy: req.userId });
    res.status(200).json({ cart });
  } catch (error) {}
};

const addProductController = async (req, res) => {
  try {
    const cart = await Cart.findOne({ createdBy: req.userId });
    cart.products.push(req.body);
    await cart.save();
    res.status(200).json({ message: "Product added in the cart" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductController = async (req, res) => {};

module.exports = {
  getCartController,
  addProductController,
  deleteProductController,
};
