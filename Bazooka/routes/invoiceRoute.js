const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  getAllInvoices,
  createInvoice,
  deleteInvoice,
} = require("../controllers/invoiceController");
const router = express.Router();

router
  .route("/")
  .get(protect, restrictTo("master"), getAllInvoices)
  .post(protect, restrictTo("customer"), createInvoice);

router.delete("/:id", protect, restrictTo("master"), deleteInvoice);

module.exports = router;
