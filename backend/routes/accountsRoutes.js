const express = require("express");
const {
  signInController,
  logInController,
  confirmationController,
  forgotPasswordController,
  resetPasswordController,
  logOutController,
} = require("../controllers/accountsController");
const checkToken = require("../middleware/ckeckToken");

const router = express.Router();

router.route("/signin").post(signInController);

router.route("/login").post(logInController);

router.route("/logout").get(logOutController);

router.route("/confirmation/:id").get(confirmationController);

router.route("/forgot").post(forgotPasswordController);

router
  .route("/reset/:id")
  .get(checkToken, async (req, res) => {
    const { id } = req.params;
    res.redirect(`http://localhost:3000/reset/${id}`);
  })
  .post(resetPasswordController);

module.exports = router;
