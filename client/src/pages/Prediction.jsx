import React, { useState } from "react";
import axios from "axios";
import {
  Sprout,
  Calendar,
  MapPin,
  Ruler,
  CloudRain,
  FlaskConical,
  Bug,
  Thermometer,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

const Prediction = () => {
  const [formData, setFormData] = useState({
    Crop: "",
    Crop_Year: "",
    Season: "",
    State: "",
    Area: "",
    Annual_Rainfall: "",
    Fertilizer: "",
    Pesticide: "",
    Avg_Temperature: "",
    Max_Temperature: "",
    Min_Temperature: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================================
  // DATASET VALUES
  // ================================

  const crops = [
    "Arecanut",
    "Arhar/Tur",
    "Castor seed",
    "Coconut ",
    "Cotton(lint)",
    "Dry chillies",
    "Gram",
    "Jute",
    "Linseed",
    "Maize",
    "Mesta",
    "Niger seed",
    "Onion",
    "Other  Rabi pulses",
    "Potato",
    "Rapeseed &Mustard",
    "Rice",
    "Sesamum",
    "Small millets",
    "Sugarcane",
    "Sweet potato",
    "Tapioca",
    "Tobacco",
    "Turmeric",
    "Wheat",
    "Bajra",
    "Black pepper",
    "Cardamom",
    "Coriander",
    "Garlic",
    "Ginger",
    "Groundnut",
    "Horse-gram",
    "Jowar",
    "Ragi",
    "Cashewnut",
    "Banana",
    "Soyabean",
    "Barley",
    "Khesari",
    "Masoor",
    "Moong(Green Gram)",
    "Other Kharif pulses",
    "Safflower",
    "Sannhamp",
    "Sunflower",
    "Urad",
    "Peas & beans (Pulses)",
    "other oilseeds",
    "Other Cereals",
    "Cowpea(Lobia)",
    "Oilseeds total",
    "Guar seed",
    "Other Summer Pulses",
    "Moth",
  ];

  const seasons = [
    "Whole Year",
    "Kharif",
    "Rabi",
    "Autumn",
    "Summer",
    "Winter",
  ];

  const states = [
    "Assam",
    "Karnataka",
    "Kerala",
    "Meghalaya",
    "West Bengal",
    "Puducherry",
    "Goa",
    "Andhra Pradesh",
    "Tamil Nadu",
    "Odisha",
    "Bihar",
    "Gujarat",
    "Madhya Pradesh",
    "Maharashtra",
    "Mizoram",
    "Punjab",
    "Uttar Pradesh",
    "Haryana",
    "Himachal Pradesh",
    "Tripura",
    "Nagaland",
    "Chhattisgarh",
    "Uttarakhand",
    "Jharkhand",
    "Delhi",
    "Manipur",
    "Jammu and Kashmir",
    "Telangana",
    "Arunachal Pradesh",
    "Sikkim",
  ];

  // ================================
  // HANDLE INPUT
  // ================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ================================
  // SUBMIT PREDICTION
  // ================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setPrediction(null);

    // Check empty fields
    const emptyField = Object.entries(formData).find(
      ([, value]) => value === "",
    );

    if (emptyField) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not authenticated. Please login again.");
        setLoading(false);
        return;
      }

      // Convert numerical values to numbers
      const payload = {
        Crop: formData.Crop.trim(),
        Crop_Year: Number(formData.Crop_Year),
        Season: formData.Season.trim(),
        State: formData.State.trim(),
        Area: Number(formData.Area),
        Annual_Rainfall: Number(formData.Annual_Rainfall),
        Fertilizer: Number(formData.Fertilizer),
        Pesticide: Number(formData.Pesticide),
        Avg_Temperature: Number(formData.Avg_Temperature),
        Max_Temperature: Number(formData.Max_Temperature),
        Min_Temperature: Number(formData.Min_Temperature),
      };

      const response = await axios.post(
        "http://localhost:5000/api/predictions/yield",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        setPrediction(response.data.predicted_yield);
      } else {
        setError(response.data.message || "Unable to generate prediction.");
      }
    } catch (err) {
      console.error("Prediction error:", err);

      setError(
        err.response?.data?.message ||
          "Something went wrong while generating the prediction.",
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // RESET
  // ================================

  const handleReset = () => {
    setFormData({
      Crop: "",
      Crop_Year: "",
      Season: "",
      State: "",
      Area: "",
      Annual_Rainfall: "",
      Fertilizer: "",
      Pesticide: "",
      Avg_Temperature: "",
      Max_Temperature: "",
      Min_Temperature: "",
    });

    setPrediction(null);
    setError("");
  };

  // ================================
  // STYLES
  // ================================

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition";

  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  // ================================
  // UI
  // ================================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}
      <main className="ml-60 min-h-screen p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* ================= HEADER ================= */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp size={25} className="text-green-600" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Crop Yield Prediction
                </h1>

                <p className="text-gray-500 mt-1">
                  Use agricultural and environmental data to estimate your crop
                  yield.
                </p>
              </div>
            </div>
          </div>

          {/* ================= ERROR ================= */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />

              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* ================= MAIN GRID ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ================================================= */}
            {/* PREDICTION FORM */}
            {/* ================================================= */}

            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              {/* Form Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Sprout size={21} className="text-green-600" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Agricultural Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Enter the details used by the prediction model.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* ================= CROP + YEAR ================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  {/* Crop */}
                  <div>
                    <label className={labelClass}>Crop</label>

                    <div className="relative">
                      <Sprout
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />

                      <select
                        name="Crop"
                        value={formData.Crop}
                        onChange={handleChange}
                        className={`${inputClass} pl-10`}
                      >
                        <option value="">Select crop</option>

                        {crops.map((crop) => (
                          <option key={crop} value={crop}>
                            {crop.trim()}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Crop Year */}
                  <div>
                    <label className={labelClass}>Crop Year</label>

                    <div className="relative">
                      <Calendar
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />

                      <input
                        type="number"
                        name="Crop_Year"
                        value={formData.Crop_Year}
                        onChange={handleChange}
                        placeholder="e.g. 2025"
                        min="1990"
                        max="2100"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>
                </div>

                {/* ================= SEASON + STATE ================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  {/* Season */}
                  <div>
                    <label className={labelClass}>Season</label>

                    <select
                      name="Season"
                      value={formData.Season}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select season</option>

                      {seasons.map((season) => (
                        <option key={season} value={season}>
                          {season.trim()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* State */}
                  <div>
                    <label className={labelClass}>State</label>

                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />

                      <select
                        name="State"
                        value={formData.State}
                        onChange={handleChange}
                        className={`${inputClass} pl-10`}
                      >
                        <option value="">Select state</option>

                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* ================= AREA + RAINFALL ================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  {/* Area */}
                  <div>
                    <label className={labelClass}>Area</label>

                    <div className="relative">
                      <Ruler
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />

                      <input
                        type="number"
                        name="Area"
                        value={formData.Area}
                        onChange={handleChange}
                        placeholder="Enter cultivated area"
                        min="0"
                        step="any"
                        className={`${inputClass} pl-10`}
                      />
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                      Use the same area unit as the training dataset.
                    </p>
                  </div>

                  {/* Rainfall */}
                  <div>
                    <label className={labelClass}>Annual Rainfall</label>

                    <div className="relative">
                      <CloudRain
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />

                      <input
                        type="number"
                        name="Annual_Rainfall"
                        value={formData.Annual_Rainfall}
                        onChange={handleChange}
                        placeholder="Enter rainfall"
                        min="0"
                        step="any"
                        className={`${inputClass} pl-10`}
                      />
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                      Annual rainfall value from the dataset.
                    </p>
                  </div>
                </div>

                {/* ================= FERTILIZER + PESTICIDE ================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  {/* Fertilizer */}
                  <div>
                    <label className={labelClass}>Fertilizer</label>

                    <div className="relative">
                      <FlaskConical
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />

                      <input
                        type="number"
                        name="Fertilizer"
                        value={formData.Fertilizer}
                        onChange={handleChange}
                        placeholder="Enter fertilizer amount"
                        min="0"
                        step="any"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>

                  {/* Pesticide */}
                  <div>
                    <label className={labelClass}>Pesticide</label>

                    <div className="relative">
                      <Bug
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />

                      <input
                        type="number"
                        name="Pesticide"
                        value={formData.Pesticide}
                        onChange={handleChange}
                        placeholder="Enter pesticide amount"
                        min="0"
                        step="any"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>
                </div>

                {/* ================= TEMPERATURES ================= */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
                  {/* Average */}
                  <div>
                    <label className={labelClass}>Avg Temperature</label>

                    <div className="relative">
                      <Thermometer
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />

                      <input
                        type="number"
                        name="Avg_Temperature"
                        value={formData.Avg_Temperature}
                        onChange={handleChange}
                        placeholder="°C"
                        step="any"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>

                  {/* Maximum */}
                  <div>
                    <label className={labelClass}>Max Temperature</label>

                    <div className="relative">
                      <Thermometer
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />

                      <input
                        type="number"
                        name="Max_Temperature"
                        value={formData.Max_Temperature}
                        onChange={handleChange}
                        placeholder="°C"
                        step="any"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>

                  {/* Minimum */}
                  <div>
                    <label className={labelClass}>Min Temperature</label>

                    <div className="relative">
                      <Thermometer
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                      />

                      <input
                        type="number"
                        name="Min_Temperature"
                        value={formData.Min_Temperature}
                        onChange={handleChange}
                        placeholder="°C"
                        step="any"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                  </div>
                </div>

                {/* ================= BUTTONS ================= */}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Predicting...
                      </>
                    ) : (
                      <>
                        <TrendingUp size={19} />
                        Predict Crop Yield
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="sm:w-32 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-semibold transition cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {/* ================================================= */}
            {/* RESULT CARD */}
            {/* ================================================= */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
              {/* Result Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <TrendingUp size={21} className="text-green-600" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Prediction Result
                  </h2>

                  <p className="text-sm text-gray-500">
                    AI-powered crop yield estimate
                  </p>
                </div>
              </div>

              {/* ================= RESULT ================= */}

              {prediction !== null ? (
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <CheckCircle size={42} className="text-green-600" />
                  </div>

                  <p className="text-sm text-gray-500">Predicted Crop Yield</p>

                  <div className="mt-3">
                    <span className="text-4xl font-bold text-green-700">
                      {Number(prediction).toFixed(2)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    Based on the agricultural data provided
                  </p>

                  {/* Selected Crop */}
                  <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-100 text-left">
                    <div className="flex items-center gap-3">
                      <Sprout size={20} className="text-green-600" />

                      <div>
                        <p className="text-sm text-gray-500">Selected Crop</p>

                        <p className="font-semibold text-gray-900">
                          {formData.Crop.trim()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ================= EMPTY RESULT ================= */

                <div className="min-h-[280px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    <TrendingUp size={30} className="text-gray-400" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900">
                    No Prediction Yet
                  </h3>

                  <p className="text-sm text-gray-500 mt-2 max-w-xs">
                    Fill in the agricultural information and generate your
                    AI-powered yield prediction.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Prediction;
