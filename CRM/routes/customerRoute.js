const express = require("express");
const { createUser, updateUser } = require("../controllers/userController");
const {
  createCustomer,
  updateCustomer,
  getAllCustomers,
  deleteCustomer,
  getCustomerById,
} = require("../controllers/customerController");

const router = express.Router();

router.route("/").get(getAllCustomers).post(createCustomer);

router
  .route("/:id")
  .get(getCustomerById)
  .patch(updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
