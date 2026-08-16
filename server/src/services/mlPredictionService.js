const { spawn } = require("child_process");
const path = require("path");

// Calls the Python ML model and returns the prediction
const predictYield = (inputData) => {
  return new Promise((resolve, reject) => {
    // Path to the Python prediction script
    const pythonScript = path.join(__dirname, "../../../ml/predict.py");

    // Use the Python environment where XGBoost is installed
    const pythonPath = path.join(
      __dirname,
      "../../../ml/venv/Scripts/python.exe",
    );

    // Start Python using the ML virtual environment
    const python = spawn(pythonPath, [pythonScript]);
    let output = "";
    let error = "";

    // Collect Python output
    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Collect Python errors
    python.stderr.on("data", (data) => {
      error += data.toString();
    });

    // Send JSON input to Python
    python.stdin.write(JSON.stringify(inputData));
    python.stdin.end();

    // Handle Python completion
    python.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(error));
      }

      try {
        const result = JSON.parse(output);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  });
};

module.exports = {
  predictYield,
};
