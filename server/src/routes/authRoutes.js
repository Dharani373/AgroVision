const express = require("express");

const { register, login, getMe } = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, getMe);
router.get("/farmer-test", protect, authorize("farmer"), (req, res) => {
  res.json({
    success: true,
    message: "Farmer access granted",
  });
});
module.exports = router;
