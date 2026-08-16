const { predictYield } = require("../services/mlPredictionService");

// Handles crop yield prediction requests
const predictCropYield = async (req, res) => {
  try {
    // Get prediction from the Python ML service
    const result = await predictYield(req.body);

    // Return the prediction to the frontend
    res.status(200).json(result);
  } catch (error) {
    // Print the complete error
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

module.exports = {
  predictCropYield,
};
