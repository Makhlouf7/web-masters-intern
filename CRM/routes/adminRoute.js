const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");
const upload = require("../utils/upload");
const {
  getAdmin,
  createAdmin,
  deleteAdmin,
  createTask,
  deleteTask,
  updateTask,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/adminController");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(restrictTo("master", "admin"), getAdmin)
  .post(restrictTo("master"), createAdmin);
router.route("/:id").delete(restrictTo("master"), deleteAdmin);

router.use(restrictTo("master", "admin"));

router.route("/tasks").post(createTask);
router.route("/tasks/:id").patch(updateTask).delete(deleteTask);

router.route("/activities").post(upload.array("images"), createActivity);
router
  .route("/activities/:id")
  .patch(upload.array("images"), updateActivity)
  .delete(deleteActivity);
module.exports = router;
