const express = require("express");

const {
  createCrop,
  getFarmCrops,
  updateCrop,
  deleteCrop,
} = require("../controllers/cropController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect, authorize("farmer"));

router.post("/farm/:farmId", createCrop);
router.get("/farm/:farmId", getFarmCrops);
router.put("/:id", updateCrop);
router.delete("/:id", deleteCrop);

module.exports = router;
