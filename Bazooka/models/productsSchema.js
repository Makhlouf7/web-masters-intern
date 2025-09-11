const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
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
  choices: [String],
});

module.exports = productsSchema;
