const Deal = require("../models/dealModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const deleteImages = require("../utils/deleteImages");

// HELPER FUNCTIONS =====
// Null ...

// MAIN FUNCTIONS =====

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

// const updateDeal = catchAsync

const deleteDeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedDeal = await Deal.findByIdAndDelete(id);
  if (!deletedDeal) return next(new AppError("Deal not found!", 404));

  const { images } = deletedDeal;
  await deleteImages(images);
  res.status(204).json({ status: "success", data: null });
});

module.exports = { createDeal, deleteDeal };
