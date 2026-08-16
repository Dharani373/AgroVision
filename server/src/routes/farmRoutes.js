const express = require("express");

const {
  createFarm,
  getMyFarms,
  getFarmById,
  updateFarm,
  deleteFarm,
} = require("../controllers/farmController");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect, authorize("farmer"));

router.post("/", createFarm);
router.get("/", getMyFarms);
router.get("/:id", getFarmById);
router.put("/:id", updateFarm);
router.delete("/:id", deleteFarm);

module.exports = router;
