const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const deleteImages = require("../utils/deleteImages");

exports.createProduct = catchAsync(async (req, res, next) => {
  const images = [];
  if (req.files) req.files.forEach((file) => images.push(file.originalname));
  req.body.images = images;
  req.body.choices = JSON.parse(req.body.choices);
  req.body.priceList = JSON.parse(req.body.priceList);
  const product = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: { product },
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;
  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { product },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const images = [];
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  if (req.body.choices) req.body.choices = JSON.parse(req.body.choices);
  if (req.body.priceList) req.body.priceList = JSON.parse(req.body.priceList);

  if (req?.files?.length > 0) {
    req.files.forEach((file) => images.push(file.originalname));
    req.body.images = images;
    await deleteImages(product.images);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: { updatedProduct },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  await deleteImages(product.images);

  res.status(204).end();
});
