const Deal = require("../models/dealModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const deleteImages = require("../utils/deleteImages");

// HELPER FUNCTIONS =====
// Null ...

// MAIN FUNCTIONS =====

const getAll = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Deal.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const deals = await features.query;

  res.status(200).json({
    status: "success",
    data: deals,
  });
});

const getDealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deal = await Deal.findById(id);

  res.status(200).json({
    status: "success",
    data: deal,
  });
});

const createDeal = catchAsync(async (req, res, next) => {
  const images = [];
  if (req.files) req.files.forEach((file) => images.push(file.originalname));
  req.body.images = images;

  const createdDeal = await Deal.create(req.body);
  res.status(200).json({
    status: "success",
    data: createdDeal,
  });
});

const updateDeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const images = [];
  const deal = await Deal.findById(id);
  if (!deal) return next(new AppError("Deal not found!", 404));

  if (req?.files?.length > 0) {
    req.files.forEach((file) => images.push(file.originalname));
    req.body.images = images;
    await deleteImages(deal.images);
  }

  const updatedDeal = await Deal.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json({
    status: "success",
    data: updatedDeal,
  });
});

const deleteDeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedDeal = await Deal.findByIdAndDelete(id);
  if (!deletedDeal) return next(new AppError("Deal not found!", 404));

  const { images } = deletedDeal;
  await deleteImages(images);
  res.status(204).end();
});

module.exports = { getAll, getDealById, createDeal, updateDeal, deleteDeal };
