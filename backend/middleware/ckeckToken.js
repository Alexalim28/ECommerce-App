const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { UnauthorizedError, BadRequestError } = require("../errors");

const checkToken = async (req, res, next) => {
  const { access_token } = req.cookies;
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) throw new UnauthorizedError("Invalid credentials");

  const secret = process.env.SECRET + user.password;

  const decoded = jwt.verify(access_token, secret);
  next();
};

module.exports = checkToken;
