const { Product } = require("../models/Product");
const { NotAvailableError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllProductsController = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

const getProductByIdController = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) throw new NotAvailableError("This product is not available");

  res.status(StatusCodes.OK).json({ product });
};

module.exports = {
  getAllProductsController,
  getProductByIdController,
};
