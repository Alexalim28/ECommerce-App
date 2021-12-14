const express = require("express");
const router = express.Router();

const {
  getCartController,
  addProductController,
  deleteProductController,
} = require("../controllers/cartsController");

router.route("/getCart").get(getCartController);

router.route("/addProduct").patch(addProductController);

router.route("/deleteProduct/:id").delete(deleteProductController);

module.exports = router;
