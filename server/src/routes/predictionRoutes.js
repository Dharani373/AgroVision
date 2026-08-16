const express = require("express");
const router = express.Router();

const { predictCropYield } = require("../controllers/predictionController");

// Route for crop yield prediction
router.post("/yield", predictCropYield);

module.exports = router;
