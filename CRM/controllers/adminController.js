const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");

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

const deleteAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  await User.findByIdAndDelete(id);
  await Admin.findOneAndDelete({ user: id });

  res.status(204).end();
});

const createTask = async (req, res, next) => {
  const updatedAdmin = await Admin.findOneAndUpdate(
    { user: req.user._id },
    { $push: { tasks: req.body } },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    data: updatedAdmin,
  });
};

// We still can't update a specific task
const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const admin = await Admin.findOneAndUpdate({
    user: req.user._id,
  });

  res.status(200).json({
    status: "success",
    data: updatedAdmin,
  });
};

const deleteTask = async (req, res, next) => {
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
};

module.exports = {
  createAdmin,
  deleteAdmin,
  createTask,
  updateTask,
  deleteTask,
};
