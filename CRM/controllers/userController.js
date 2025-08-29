const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const filterAttributes = require("../utils/filterAttributes");

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, roles } = req.body;
  let passwordHash = null;

  if (roles !== "customer") passwordHash = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    passwordHash,
    roles,
  });

  req.user = user;
  next();
});

const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const userData = filterAttributes(req.body, ["name", "email", "roles"]);

  const user = await User.findByIdAndUpdate(id, userData);
});

module.exports = { createUser, updateUser };
