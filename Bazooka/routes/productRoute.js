const express = require("express");
const upload = require("../utils/upload");
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(protect, restrictTo("master"), upload.array("images"), createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(protect, restrictTo("master"), upload.array("images"), updateProduct)
  .delete(protect, restrictTo("master"), deleteProduct);

module.exports = router;
