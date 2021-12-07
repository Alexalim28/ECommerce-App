const express = require("express");
const {
  signInController,
  logInController,
} = require("../controllers/accountsController");

const router = express.Router();

router.route("/signin").post(signInController);

router.route("/login").post(logInController);

module.exports = router;
