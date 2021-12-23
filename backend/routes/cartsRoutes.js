const express = require("express");
const router = express.Router();

const {
  getCartController,
  addProductController,
  deleteProductController,
} = require("../controllers/cartsController");

router.route("/getCart").get(getCartController);

router.route("/addProduct/:productId").patch(addProductController);

router.route("/deleteProduct/:id").patch(deleteProductController);

module.exports = router;
