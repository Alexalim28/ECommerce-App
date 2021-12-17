const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const { access_token } = req.cookies;
  const { userId } = jwt.verify(access_token, process.env.SECRET);
  req.userId = userId;
  next();
};

module.exports = authMiddleware;
