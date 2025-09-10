const mongoose = require("mongoose");
const productsSchema = require("./productsSchema");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: [true, "User id is required"],
  },
  products: [productsSchema],
  shippingAddress: {
    type: String,
    required: true,
    trim: true,
  },
  invoiceTotal: {
    type: Number,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
