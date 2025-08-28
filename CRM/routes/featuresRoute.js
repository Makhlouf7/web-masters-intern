const { urlShorten } = require("../controllers/featuresController.js");
const router = require("express").Router();

router.post("/shorten", urlShorten);

module.exports = router;
