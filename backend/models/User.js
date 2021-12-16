const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");
const { UnauthorizedError, BadRequestError } = require("../errors");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "You must enter your first name"],
  },
  lastName: {
    type: String,
    required: [true, "You must enter your last name"],
  },
  email: {
    type: String,
    required: [true, "You must enter your email"],
    unique: true,
    validate: [isEmail, "Your email is not valid"],
  },
  password: {
    type: String,
    required: [true, "You must enter password"],
    minlength: [4, "Your password must have more than 4 characters"],
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function checkPassword(
  candidatePassword
) {
  const res = await bcrypt.compare(candidatePassword, this.password);
  return res;
};

userSchema.statics.login = async function login(email, password) {
  const user = await this.findOne({ email });

  if (user) {
    if (!user.confirmed) {
      throw new BadRequestError("This account is not confirmed");
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (isCorrectPassword) {
      return user;
    }
    throw new UnauthorizedError("Invalid password");
  }
  throw new UnauthorizedError(
    "You must first create an account before login in!"
  );
};

module.exports = mongoose.model("user", userSchema);
