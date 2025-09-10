const Cart = require("../models/cartModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Add item to cart (create or update cart)
exports.addItemToCart = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { productId, size, quantity, choices } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({
      userId,
      products: [{ productId, size, quantity, choices }],
    });
  } else {
    // Check if product with same size and choices exists
    const existingProduct = cart.products.find(
      (p) =>
        p.productId.equals(productId) &&
        p.size === size &&
        JSON.stringify(p.choices) === JSON.stringify(choices)
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, size, quantity, choices });
    }
    await cart.save();
  }
  res.status(200).json({ status: "success", data: cart });
});

// Remove item from cart
exports.removeItemFromCart = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { productId, size, choices } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) return next(new AppError("Cart not found", 404));

  cart.products = cart.products.filter(
    (p) =>
      !(
        p.productId.equals(productId) &&
        p.size === size &&
        JSON.stringify(p.choices) === JSON.stringify(choices)
      )
  );
  await cart.save();
  res.status(200).json({ status: "success", data: cart });
});

// Get user's cart
exports.getCart = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ userId });
  if (!cart) return next(new AppError("Cart not found", 404));
  res.status(200).json({ status: "success", data: cart });
});
