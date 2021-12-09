const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmail,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
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
      throw Error("This account is not confirmed");
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (isCorrectPassword) {
      return user;
    }
    throw Error("Invalid password");
  }
  throw Error("This email doesn't exist");
};

module.exports = mongoose.model("user", userSchema);
