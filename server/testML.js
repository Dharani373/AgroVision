const { predictYield } = require("./src/services/mlPredictionService");

// Test input for the ML model
const input = {
  Crop: "Rice",
  Crop_Year: 2026,
  Season: "Kharif",
  State: "Telangana",
  Area: 10000,
  Annual_Rainfall: 1200,
  Fertilizer: 500000,
  Pesticide: 5000,
  Avg_Temperature: 26,
  Max_Temperature: 35,
  Min_Temperature: 18,
};

// Call the Python ML service
predictYield(input)
  .then((result) => {
    console.log("ML Result:");
    console.log(result);
  })
  .catch((error) => {
    console.error("ML Error:");
    console.error(error.message);
  });
