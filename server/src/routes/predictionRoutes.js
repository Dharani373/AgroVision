const express = require("express");

const {
  predictCropYield,
  getPredictionHistory,
} = require("../controllers/predictionController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect, authorize("farmer"));

// Create prediction
router.post("/yield", predictCropYield);

// Get logged-in farmer's prediction history
router.get("/history", getPredictionHistory);

module.exports = router;
