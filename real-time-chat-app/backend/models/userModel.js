const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "default-user-image.png",
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  friends: {
    type: [
      {
        name: { type: String },
        image: { type: String },
        id: { type: String },
      },
    ],
    default: [],
  },
  friendRequests: {
    type: [
      {
        name: { type: String },
        id: { type: String },
      },
    ],
    default: [],
  },
  sentRequests: {
    type: [
      {
        name: { type: String },
        id: { type: String },
      },
    ],
    default: [],
  },
});

userSchema.methods.comparePassword = function (candidatePassword) {
  console.log(candidatePassword, { passwordHash: this.passwordHash });
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
