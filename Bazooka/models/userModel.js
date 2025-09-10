const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      validate: {
        validator: (value) => validator.isMobilePhone(value, "ar-EG"),
        message: "Invalid phone number",
      },
      required: [true, "Phone is required"],
    },
    role: {
      type: String,
      enum: ["master", "customer"],
      default: "customer",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
