const express = require("express");
const {
  signInController,
  logInController,
  confirmationController,
} = require("../controllers/accountsController");

const router = express.Router();

router.route("/signin").post(signInController);

router.route("/login").post(logInController);

router.route("/confirmation/:id").get(confirmationController);

module.exports = router;
