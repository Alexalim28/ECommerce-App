const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const { access_token } = req.cookies;
  try {
    const { userId } = jwt.verify(access_token, process.env.SECRET);
    req.userId = userId;
    console.log("In Middleware...");
    next();
  } catch (error) {
    res.status(401).json({ error: "You must create an account or login" });
  }
};

module.exports = authMiddleware;
