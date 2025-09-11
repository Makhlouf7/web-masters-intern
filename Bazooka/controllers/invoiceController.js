const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const Invoice = require("../models/invoiceModel");
const Cart = require("../models/cartModel");
const catchAsync = require("../utils/catchAsync");

exports.createInvoice = catchAsync(async (req, res, next) => {
  const { shippingAddress } = req.body;
  if (!shippingAddress)
    return next(new AppError("Please add your shipping address", 400));
  const cart = await Cart.findOne({ userId: req.user._id });

  if (cart.products.length < 1)
    return next(new AppError("Please add at least one item to your cart"));

  const invoice = await Invoice.create({
    userId: req.user._id,
    products: cart.products,
    shippingAddress,
  });

  cart.products = [];
  await cart.save();

  res.status(201).json({
    status: "success",
    data: invoice,
  });
});

exports.getAllInvoices = catchAsync(async (req, res, next) => {
  const query = new APIFeatures(Invoice.find(), req.query).sort().paginate();

  const invoices = await query.query;

  res.status(200).json({
    status: "success",
    results: invoices.length,
    data: invoices,
  });
});

exports.getInvoice = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) {
    return next(new AppError("No invoice found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: invoice,
  });
});

exports.deleteInvoice = catchAsync(async (req, res, next) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);
  if (!invoice) {
    return next(new AppError("No invoice found with that ID", 404));
  }
  res.status(204).end();
});
