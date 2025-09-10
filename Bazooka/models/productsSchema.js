const mongoose = require("mongoose");
const Product = require("./productModel");

const productsSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    size: {
      type: String,
      trim: true,
      required: [true, "Please select a size"],
    },
    quantity: {
      type: Number,
      min: 1,
      max: 20,
      required: true,
    },
    choices: {
      type: [String],
      validate: {
        validator: (choices) => Array.isArray(choices) && choices.length > 0,
        message: "Pick at least one choice.",
      },
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productsSchema.virtual("totalPrice").get(async function () {
  const product = await Product.findById(this.productId);
  const priceEntry = product.priceList.find(
    (priceEntry) => priceEntry.size == this.size
  );

  return priceEntry.price * this.quantity;
});

module.exports = productsSchema;
