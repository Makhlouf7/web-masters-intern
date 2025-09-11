const mongoose = require("mongoose");
const productsSchema = require("./productsSchema");
const Product = require("./productModel");

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

invoiceSchema.pre("save", async function (next) {
  let total = 0;
  for (const item of this.products) {
    const product = await Product.findById(item.productId);
    const priceEntry = product.priceList.find((p) => p.size === item.size);

    total += priceEntry.price * item.quantity;
  }
  this.invoiceTotal = total;
  next();
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
