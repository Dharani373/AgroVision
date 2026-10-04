const { predictYield } = require("../services/mlPredictionService");
const Prediction = require("../models/Prediction");

// Handles crop yield prediction requests
const predictCropYield = async (req, res) => {
  try {
    // Run the ML model
    const result = await predictYield(req.body);

    // Save prediction to MongoDB
    const prediction = await Prediction.create({
      user: req.user.id,
      input: req.body,
      predictedYield: result.predicted_yield,
    });

    res.status(200).json({
      success: true,
      predicted_yield: result.predicted_yield,
      predictionId: prediction._id,
    });
  } catch (error) {
    console.error("========== ML ERROR ==========");
    console.error(error);
    console.error("Error message:", error.message);
    console.error("==============================");

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get prediction history for the logged-in farmer
const getPredictionHistory = async (req, res) => {
  try {
    const predictions = await Prediction.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      predictions,
    });
  } catch (error) {
    console.error("========== HISTORY ERROR ==========");
    console.error(error);
    console.error("===================================");

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  predictCropYield,
  getPredictionHistory,
};
