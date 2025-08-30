const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const {
  createAdmin,
  deleteAdmin,
  createTask,
  deleteTask,
  updateTask,
} = require("../controllers/adminController");

const router = express.Router();

router.use(protect);

router.route("/").post(restrictTo("master"), createAdmin);
router.route("/:id").delete(restrictTo("master"), deleteAdmin);

router.route("/tasks").post(createTask);
router.route("/tasks/:id").patch(updateTask).delete(deleteTask);
module.exports = router;
