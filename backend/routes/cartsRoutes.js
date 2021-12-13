const express = require("express");
const router = express.Router();

const {
  getCartController,
  updateCartController,
  deleteProductController,
} = require("../controllers/cartsController");

router.route("/getCart").get(getCartController);

router.route("/updateCart").patch(updateCartController);

router.route("/deleteProduct/:id").delete(deleteProductController);

module.exports = router;
