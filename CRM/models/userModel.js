const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: [true, "User must have a name"],
  },
  image: {
    type: String,
    default: "/uploads/default.png",
  },
  role: {
    type: String,
    trim: true,
    enum: {
      values: ["master", "admin", "customer"],
      message: "invalid role",
    },
    required: true,
  },
  passwordHash: {
    type: String,
    select: false,
    required: function () {
      return this.role === "master" || this.role === "admin";
    },
  },
});

userSchema.methods.comparePassword = function (candidatePassword) {
  console.log(candidatePassword, { passwordHash: this.passwordHash });
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
