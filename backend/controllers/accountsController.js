const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "0.0.0.0",
  port: 1025,
  secure: false,
});

const MAX_AGE = 24 * 60 * 60 * 1000;

const signInController = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const name = user.firstName.toLowerCase();

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    const info = await transporter.sendMail({
      from: '"Salim" <salim@example.com>',
      to: `${name}@example.com`,
      subject: "Email Confirmation",
      html: `<h3><a href="http://localhost:8080/api/accounts/confirmation/${user._id}">Click here</a> to confirm your email</h3>`,
    });

    console.log(info.response);

    res
      .status(201)
      .cookie("access_token", token, { maxAge: MAX_AGE, httpOnly: true })
      .json({ message: "User created" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const logInController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ error: "One field is missing" });
  }

  let user;
  try {
    user = await User.login(email, password);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
    expiresIn: "1d",
  });

  res
    .status(200)
    .cookie("access_token", token, { maxAge: MAX_AGE, httpOnly: true })
    .json({ message: "Successfully logged in" });
};

const confirmationController = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndUpdate(id, { confirmed: true }, { new: true });
    res.redirect("http://localhost:3000/");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signInController,
  logInController,
  confirmationController,
};
