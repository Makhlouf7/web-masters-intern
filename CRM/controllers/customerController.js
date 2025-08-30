const Customer = require("../models/customerModel");
const User = require("../models/userModel");
const Deal = require("../models/dealModel");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const filterAttributes = require("../utils/filterAttributes");
const deleteImages = require("../utils/deleteImages");

// HELPER FUNCTIONS =====
// Null ...

// MAIN FUNCTIONS =====

const getAllCustomers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Customer.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const customers = await features.query;

  res.status(200).json({
    status: "success",
    data: customers,
  });
});

const getCustomerById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const customer = await Customer.findById(id);

  res.status(200).json({
    status: "success",
    data: customer,
  });
});

const createCustomer = catchAsync(async (req, res, next) => {
  const { email, name } = req.body;
  const createdUser = await User.create({ email, name, role: "customer" });
  const createdCustomer = await Customer.create({
    ...req.body,
    user: createdUser._id,
  });

  const customer = await createdCustomer.populate({
    path: "user",
    select: "email name image",
  });

  res.status(200).json({
    status: "success",
    data: customer,
  });
});

const updateCustomer = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  const userData = filterAttributes(req.body, ["email", "name"]);
  await User.findByIdAndUpdate(updatedCustomer.user, userData);

  const customer = await updatedCustomer.populate({
    path: "user",
    select: "name email image",
  });

  res.status(200).json({
    status: "success",
    data: customer,
  });
});

const deleteCustomer = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedCustomer = await Customer.findByIdAndDelete(id);
  if (!deletedCustomer) return next(new AppError("Customer not found!", 404));
  await User.findByIdAndDelete(deletedCustomer.user);
  const customerDeals = await Deal.find({ customer: id });

  await Promise.all(
    customerDeals.map((deal) => {
      const { images } = deal;
      return deleteImages(images);
    })
  );

  await Deal.deleteMany({ customer: id });

  res.status(204).end();
});

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
