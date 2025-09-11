const express = require("express");
const { isUserLoggedIn } = require("../controllers/authController");
const {
  initializeCart,
  mergeSessionCart,
  addItemToCart,
  removeItemFromCart,
  getCart,
} = require("../controllers/cartController");

const router = express.Router();

// User is logged in functions
router.use(initializeCart, isUserLoggedIn, mergeSessionCart);
router.route("/").get(getCart).post(addItemToCart);
router.delete("/:id", removeItemFromCart);

module.exports = router;
