const User = require("../models/User");
const jwt = require("jsonwebtoken");

const MAX_AGE = 24 * 60 * 60 * 1000;

const signInController = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "1d",
    });
    res
      .status(201)
      //   .cookie("access_token", token, { expires: MAX_AGE, httpOnly: true })
      .json({ message: "User created" });
  } catch (error) {
    res.status(400).json({ error: "User registration failed" });
  }
};

const logInController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ error: "One field is missing" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "This email doesn't exist" });
  }

  const isCorrectPassword = await user.checkPassword(password);
  if (!isCorrectPassword) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
    expiresIn: "1d",
  });

  res
    .status(200)
    // .cookie("access_token", token, { expires: MAX_AGE, httpOnly: true })
    .json({ message: "Successfully logged in" });
};

module.exports = {
  signInController,
  logInController,
};
