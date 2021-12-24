const { Product } = require("../models/Product");
const Cart = require("../models/Cart");

const getCartController = async (req, res) => {
  const cart = await Cart.findOne({ createdBy: req.userId });
  res.status(200).json({ cart });
};

const addProductController = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findByIdAndUpdate(productId, {
    $inc: { qtyInStock: -1 },
  });

  const cart = await Cart.findOne({ createdBy: req.userId });
  cart.products.push(req.body);
  cart.total += product.price;
  await cart.save();

  res.status(200).json({ cart, message: "Product added in the cart" });
};

const deleteProductController = async (req, res) => {
  const {
    body: { productId },
    userId,
  } = req;

  const cart = await Cart.findOne({ createdBy: userId });

  const product = cart.products.find(
    (product) => product._id.toString() === productId
  );

  const price = product.price;
  cart.total -= price;

  cart.products = cart.products.filter(
    (product) => product._id.toString() !== productId
  );

  await cart.save();

  // const cart = await Cart.findOneAndUpdate(
  //   { createdBy: userId },
  //   { $pull: { products: { _id: id } } },
  //   { new: true }
  // );

  res.status(200).json({ cart });
};

module.exports = {
  getCartController,
  addProductController,
  deleteProductController,
};
