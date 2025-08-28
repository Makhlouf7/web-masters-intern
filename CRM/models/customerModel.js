const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    minLength: [11, "Phone number must be 11 digits"],
    maxLength: [11, "Phone number must be 11 digits"],
    required: true,
  },
  address: {
    type: String,
    required: [true, "Address cannot be empty"],
  },
  city: {
    type: String,
    required: [true, "City cannot be empty"],
  },
  zibCode: {
    type: String,
    required: [true, "Zib code cannot be empty"],
  },
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
