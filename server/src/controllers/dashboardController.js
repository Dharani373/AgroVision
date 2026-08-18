const Farm = require("../models/Farm");
const Prediction = require("../models/Prediction");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's farms
    const totalFarms = await Farm.countDocuments({
      owner: userId,
    });

    // Get user's predictions
    const predictions = await Prediction.find({
      user: userId,
    }).sort({ createdAt: -1 });

    const totalPredictions = predictions.length;

    // Get unique crops
    const crops = new Set();

    predictions.forEach((prediction) => {
      if (prediction.input?.Crop) {
        crops.add(prediction.input.Crop);
      }
    });

    const cropsTracked = crops.size;

    // Calculate average yield
    let averageYield = 0;

    if (totalPredictions > 0) {
      const totalYield = predictions.reduce(
        (sum, prediction) => sum + prediction.predictedYield,
        0,
      );

      averageYield = totalYield / totalPredictions;
    }

    // Only send latest 5 predictions
    const recentPredictions = predictions.slice(0, 5).map((prediction) => ({
      id: prediction._id,
      crop: prediction.input?.Crop || "Unknown",
      year: prediction.input?.Crop_Year || null,
      season: prediction.input?.Season || "Unknown",
      state: prediction.input?.State || "Unknown",
      area: prediction.input?.Area || 0,
      predictedYield: prediction.predictedYield,
      createdAt: prediction.createdAt,
    }));

    res.status(200).json({
      success: true,

      stats: {
        totalFarms,
        totalPredictions,
        cropsTracked,
        averageYield: Number(averageYield.toFixed(2)),
      },

      recentPredictions,
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

module.exports = {
  getDashboard,
};
