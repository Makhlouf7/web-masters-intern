const mongoose = require("mongoose");

const priceListSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  size: {
    type: String,
    unique: true,
    default: "one-size",
    trim: true,
  },
});

const choicesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Choice title is required"],
  },
  values: {
    type: [String],
    validator: (arr) => Array.isArray(arr) && arr.length > 0,
    message: "At least one choice is required",
  },
});

const productSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    priceList: {
      type: [priceListSchema],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "At least one price entry is required",
      },
      required: [true, "At least one price entry is required"],
    },
    choices: [choicesSchema],
    images: [String],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
