const express = require("express");
const {
  getAll,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal,
} = require("../controllers/dealController");
const upload = require("../utils/upload");
const router = express.Router();

router.route("/").get(getAll).post(upload.array("images"), createDeal);

router
  .route("/:id")
  .get(getDealById)
  .patch(upload.array("images"), updateDeal)
  .delete(deleteDeal);

// router.route("*").all((req, res, next) => {
//   res.status(404).json({
//     message: "Not found",
//   });
// });

module.exports = router;
