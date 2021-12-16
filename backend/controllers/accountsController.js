const User = require("../models/User");
const Cart = require("../models/Cart");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { StatusCodes } = require("http-status-codes");
const { UnauthorizedError, BadRequestError } = require("../errors");

let transporter = nodemailer.createTransport({
  host: "0.0.0.0",
  port: 1025,
  secure: false,
});

const MAX_AGE = 24 * 60 * 60 * 1000;

const signInController = async (req, res) => {
  const user = await User.create(req.body);
  const name = user.firstName.toLowerCase();

  const info = await transporter.sendMail({
    from: '"Salim" <salim@example.com>',
    to: `${name}@example.com`,
    subject: "Email Confirmation",
    html: `<h3><a href="http://localhost:8080/api/accounts/confirmation/${user._id}">Click here</a> to confirm your email</h3>`,
  });

  console.log(info.response);

  res
    .status(StatusCodes.CREATED)
    .json({ message: "User succesfully created!" });
};

const confirmationController = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    id,
    { confirmed: true },
    { new: true }
  );

  await Cart.create({
    createdBy: user._id,
    products: [],
  });

  const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
    expiresIn: MAX_AGE,
  });

  res
    .cookie("access_token", token, { maxAge: MAX_AGE, httpOnly: true })
    .redirect("http://localhost:3000/");
};

const logInController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequestError("You must provide an email and a password");

  const user = await User.login(email, password);

  const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
    expiresIn: MAX_AGE,
  });

  res
    .status(StatusCodes.OK)
    .cookie("access_token", token, { maxAge: MAX_AGE, httpOnly: true })
    .json({ message: "Successfully logged in!" });
};

const logOutController = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .clearCookie("access_token")
    .json({ message: "Cookies cleared succesfully!" });
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  if (!email)
    throw new BadRequestError("You must provide an email and a password");

  const user = await User.findOne({ email });

  if (!user) throw new UnauthorizedError("Invalid credentials");

  const name = user.firstName.toLowerCase();

  const secret = process.env.SECRET + user.password;
  const token = jwt.sign({ userName: user.firstName }, secret, {
    expiresIn: "5m",
  });

  await transporter.sendMail({
    from: '"Salim" <salim@example.com>',
    to: `${name}@example.com`,
    subject: "Reset Password",
    html: `<h3><a href="http://localhost:8080/api/accounts/reset/${user._id}">Click here</a> to reset your password</h3>`,
  });

  res
    .status(StatusCodes.OK)
    .cookie("access_token", token, { maxAge: 300000, httpOnly: true })
    .json({ message: "Check you email to reset your password!" });
};

const resetPasswordController = async (req, res) => {
  const { id } = req.params;
  const { password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    throw new BadRequestError("Please confirm your password!");
  }

  const user = await User.findById(id);

  user.password = passwordConfirm;
  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
    expiresIn: MAX_AGE,
  });

  res
    .status(StatusCodes.OK)
    .cookie("access_token", token, { maxAge: MAX_AGE, httpOnly: true })
    .json({ message: "Your password has been successfully reset" });
};

module.exports = {
  signInController,
  logInController,
  logOutController,
  confirmationController,
  forgotPasswordController,
  resetPasswordController,
};
