const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkToken = async (req, res, next) => {
  const { access_token } = req.cookies;
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    const secret = process.env.SECRET + user.password;

    const decoded = jwt.verify(access_token, secret);
    next();
  } catch (error) {
    res.status(400).json({ error: "This link is no longer valid" });
  }
};

module.exports = checkToken;
