const express = require("express");
const {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(getAllCategories)
  .post(protect, restrictTo("master"), createCategory);

router
  .route("/:id")
  .get(getCategory)
  .patch(protect, restrictTo("master"), updateCategory)
  .delete(protect, restrictTo("master"), deleteCategory);

module.exports = router;
