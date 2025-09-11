const Cart = require("../models/cartModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Product = require("../models/productModel");
const { default: mongoose } = require("mongoose");

// Helper functions ===
const checkEquality = (p1, p2) => {
  return (
    p1.productId.toString() === p2.productId.toString() &&
    p1.size === p2.size &&
    JSON.stringify(p1.choices) === JSON.stringify(p2.choices)
  );
};

exports.initializeCart = (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
};

exports.mergeSessionCart = async (req, res, next) => {
  if (!req.user) return next();

  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = await Cart.create({ userId: req.user._id });
  }

  req.session.cart.forEach((sessionItem) => {
    const dbItem = cart.products.find((p) => checkEquality(p, sessionItem));
    if (!dbItem || !checkEquality(sessionItem, dbItem))
      cart.products.push(sessionItem);
    else dbItem.quantity += sessionItem.quantity;
  });

  await cart.save();
  req.session.cart = [];
  next();
};

exports.addItemToCart = catchAsync(async (req, res, next) => {
  const { productId, size, quantity, choices } = req.body;
  if (!productId || !size || !quantity || !choices)
    return next(new AppError("Incomplete data", 400));

  const product = await Product.findById(productId);
  if (!product) return next(new AppError("No product with this id", 404));
  let cart = req.session.cart;

  if (req.user) {
    cart = await Cart.findOne({ userId: req.user._id });

    const item = cart.products.find((p) => checkEquality(p, req.body));
    item
      ? (item.quantity += req.body.quantity)
      : (cart = await Cart.findOneAndUpdate(
          { userId: req.user._id },
          { $push: { products: req.body } },
          { new: true }
        ));
    await cart.save();
  } else {
    const item = cart.find((p) => checkEquality(p, req.body));
    item
      ? (item.quantity += req.body.quantity)
      : cart.push({ ...req.body, _id: new mongoose.Types.ObjectId() });
  }

  res.status(201).json({ status: "success", data: cart });
});

exports.removeItemFromCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  let cart = req.session.cart;

  if (req.user) {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart.products.id(id))
      return next(new AppError(`No item with the following id: ${id}`, 404));
    cart.products.remove(id);
    await cart.save();
  } else {
    const item = req.session.cart.find((cartItem) => cartItem._id === id);

    if (!item)
      return next(new AppError(`No item with the following id: ${id}`, 404));

    req.session.cart = cart.filter((cartItem) => cartItem._id !== id);
  }

  res.status(204).end();
});

exports.getCart = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return res.status(200).json({ status: "success", data: req.session.cart });
  }
  const userId = req.user._id;
  const cart = await Cart.findOne({ userId });
  if (!cart) return next(new AppError("Cart not found", 404));
  res.status(200).json({ status: "success", data: cart });
});
