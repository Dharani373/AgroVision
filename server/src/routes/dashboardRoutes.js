const express = require("express");

const { getDashboard } = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect, authorize("farmer"));

router.get("/", getDashboard);

module.exports = router;
