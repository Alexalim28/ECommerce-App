const { Product } = require("../models/Product");
const Cart = require("../models/Cart");

const getCartController = async (req, res) => {
  const cart = await Cart.findOne({ createdBy: req.userId });
  res.status(200).json({ cart });
};

const addProductController = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ createdBy: req.userId });
  cart.products.push(req.body);
  await cart.save();

  await Product.findByIdAndUpdate(productId, { $inc: { qtyInStock: -1 } });

  res.status(200).json({ cart, message: "Product added in the cart" });
};

const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  const cart = await Cart.findOneAndUpdate(
    { createdBy: userId },
    { $pull: { products: { _id: id } } },
    { new: true }
  );
  res.status(200).json({ cart });
};

module.exports = {
  getCartController,
  addProductController,
  deleteProductController,
};
