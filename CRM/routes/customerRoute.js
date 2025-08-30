const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  createCustomer,
  updateCustomer,
  getAllCustomers,
  deleteCustomer,
  getCustomerById,
} = require("../controllers/customerController");

const router = express.Router();

router.use(protect, restrictTo("master", "admin"));

router.route("/").get(getAllCustomers).post(createCustomer);

router
  .route("/:id")
  .get(getCustomerById)
  .patch(updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
