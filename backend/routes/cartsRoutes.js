const express = require("express");
const router = express.Router();

const {
  getCartController,
  addProductController,
  deleteProductController,
} = require("../controllers/cartsController");

router.route("/getCart").get(getCartController);

router.route("/addProduct/:productId").patch(addProductController);

router.route("/deleteProduct").patch(deleteProductController);

module.exports = router;
