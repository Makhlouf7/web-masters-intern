const express = require("express");
const { protect } = require("../controllers/authController");
const {
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
  getCart,
} = require("../controllers/cartController");

const router = express.Router();

// User is logged in functions
router.use(protect);
router.route("/").get(getCart).post(addItemToCart);
router.delete("/:id", removeItemFromCart);

module.exports = router;
