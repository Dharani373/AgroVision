# AgroVision ML

Machine Learning service for AgroVision.

## Current Objective

Predict crop yield using historical agricultural and environmental data.

## ML Task

Regression

## Target

Crop Yield (tonnes/hectare)

## Initial Models

- Linear Regression
- Random Forest Regressor
- XGBoost Regressor

## Pipeline

Dataset
→ Data Cleaning
→ Exploratory Data Analysis
→ Feature Engineering
→ Train/Validation/Test Split
→ Model Training
→ Hyperparameter Tuning
→ Evaluation
→ Model Serialization
→ FastAPI Inference

## Structure

ml/
├── data/
├── notebooks/
├── src/
├── models/
├── reports/
└── requirements.txt
