const express = require("express");
const {
  signInController,
  logInController,
  confirmationController,
  forgotPasswordController,
  resetPasswordController
} = require("../controllers/accountsController");

const router = express.Router();

router.route("/signin").post(signInController);

router.route("/login").post(logInController);

router.route("/confirmation/:id").get(confirmationController);

router.route("/forgot").post(forgotPasswordController);

router.route("/reset").post(resetPasswordController);

module.exports = router;
