const express = require("express");

const router = express.Router();

const {
  getAllProductsController,
  getProductByIdController,
} = require("../controllers/productsController");

router.route("/getAllProducts").get(getAllProductsController);

router.route("/getProduct/:id").get(getProductByIdController);

module.exports = router;
