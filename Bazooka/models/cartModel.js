const mongoose = require("mongoose");
const productsSchema = require("./productsSchema");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      required: [true, "User id is required"],
    },
    products: [productsSchema],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
