const express = require("express");
const { createDeal, deleteDeal } = require("../controllers/dealController");
const upload = require("../utils/upload");
const router = express.Router();

router.route("/").post(upload.array("images"), createDeal);

router.route("/:id").delete(deleteDeal);

module.exports = router;
