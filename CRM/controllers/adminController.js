const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const deleteImages = require("../utils/deleteImages");
const bcrypt = require("bcrypt");

const createAdmin = catchAsync(async (req, res, next) => {
  const { email, password, name } = req.body;
  const passwordHash = await bcrypt.hash(password, 12);
  const createdUser = await User.create({
    email,
    passwordHash,
    name,
    role: "admin",
  });
  const createdAdmin = await Admin.create({ user: createdUser._id });

  const admin = await createdAdmin.populate({
    path: "user",
    select: "name email",
  });

  res.status(201).json({
    status: "success",
    data: {
      admin,
      password,
    },
    message:
      "The admin account has been successfully created. Share the password with the assigned admin and advise them to change it immediately after their first login for security reasons.",
  });
});

const getAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admin.findOne({ user: req.user._id });
  res.status(200).json({
    status: "success",
    data: admin,
  });
});

const deleteAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  await User.findByIdAndDelete(id);
  await Admin.findOneAndDelete({ user: id });

  res.status(204).end();
});

const createTask = catchAsync(async (req, res, next) => {
  const updatedAdmin = await Admin.findOneAndUpdate(
    { user: req.user._id },
    { $push: { tasks: req.body } },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    data: updatedAdmin,
  });
});

const updateTask = catchAsync(async (req, res, next) => {
  const { id: taskId } = req.params;
  const admin = await Admin.findOne({ user: req.user._id });
  const task = admin.tasks.id(taskId);

  if (!task) return next(new AppError("Task not found"));

  task.set(req.body);
  await admin.save();

  res.status(200).json({ status: "success", data: admin });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedAdmin = await Admin.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { tasks: { _id: id } },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedAdmin,
  });
});

const createActivity = catchAsync(async (req, res, next) => {
  const images = [];
  if (req.files) req.files.forEach((file) => images.push(file.originalname));
  req.body.images = images;
  const updatedAdmin = await Admin.findOneAndUpdate(
    { user: req.user._id },
    {
      $push: { activities: req.body },
    },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    data: updatedAdmin,
  });
});

const updateActivity = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const images = [];
  const admin = await Admin.findOne({ user: req.user._id });
  const activity = admin.activities.id(id);

  if (req?.files?.length > 0) {
    req.files.forEach((file) => images.push(file.originalname));
    req.body.images = images;
    await deleteImages(activity.images);
  }

  activity.set(req.body);
  await admin.save();

  res.status(200).json({
    status: "success",
    data: admin,
  });
});

const deleteActivity = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const oldAdmin = await Admin.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { activities: { _id: id } },
    }
  );

  const activity = oldAdmin.activities.id(id);
  await deleteImages(activity.images);

  res.status(204).end();
});

module.exports = {
  getAdmin,
  createAdmin,
  deleteAdmin,
  createTask,
  updateTask,
  deleteTask,
  createActivity,
  updateActivity,
  deleteActivity,
};
