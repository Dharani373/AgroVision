import os
import sys
import json
import joblib
import pandas as pd
from xgboost import XGBRegressor


# Find the ML project folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# Load the trained model
model = XGBRegressor()
model.load_model(
    os.path.join(BASE_DIR, "models", "yield_model.json")
)


# Load the preprocessing pipeline
preprocessor = joblib.load(
    os.path.join(BASE_DIR, "models", "preprocessor.pkl")
)


# Read JSON input from stdin
input_data = json.load(sys.stdin)

# Convert input into a DataFrame
input_df = pd.DataFrame([input_data])


# Transform the input
input_encoded = preprocessor.transform(input_df)


# Generate the prediction
prediction = model.predict(input_encoded)[0]


# Return the prediction as JSON
print(json.dumps({
    "success": True,
    "predicted_yield": float(prediction)
}))