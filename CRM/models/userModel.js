const mongoose = require("mongoose");

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
  roles: {
    type: String,
    trim: true,
    enum: {
      values: ["admin", "customer"],
      message: "invalid role",
    },
    required: true,
  },
  passwordHash: {
    type: String,
    select: false,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
