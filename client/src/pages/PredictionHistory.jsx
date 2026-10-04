import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart3,
  Sprout,
  CalendarDays,
  MapPin,
  CloudRain,
  RefreshCw,
  AlertCircle,
  Search,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

const PredictionHistory = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchPredictionHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/predictions/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setPredictions(response.data.predictions || []);
    } catch (error) {
      console.error("Failed to fetch prediction history:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      setError(
        error.response?.data?.message || "Failed to load prediction history.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictionHistory();
  }, []);

  // Filter predictions
  const filteredPredictions = predictions.filter((prediction) => {
    const input = prediction.input || {};

    const crop = String(input.Crop || "").toLowerCase();
    const state = String(input.State || "").toLowerCase();
    const season = String(input.Season || "").toLowerCase();

    const query = search.toLowerCase();

    return (
      crop.includes(query) || state.includes(query) || season.includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-72 min-h-screen p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <BarChart3 size={30} className="text-green-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Prediction History
              </h1>

              <p className="text-gray-500 mt-1">
                View your previous AI-powered crop yield predictions.
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            <AlertCircle size={20} />

            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* Card Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Predictions
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {predictions.length} prediction
                  {predictions.length !== 1 ? "s" : ""} recorded
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search predictions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                  />
                </div>

                {/* Refresh */}
                <button
                  type="button"
                  onClick={fetchPredictionHistory}
                  className="p-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition cursor-pointer"
                  title="Refresh"
                >
                  <RefreshCw size={19} />
                </button>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
              <RefreshCw
                size={34}
                className="text-green-600 animate-spin mb-4"
              />

              <p className="text-gray-500">Loading prediction history...</p>
            </div>
          ) : filteredPredictions.length === 0 ? (
            /* Empty State */
            <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-6">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-5">
                <Sprout size={36} className="text-green-600" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900">
                {search ? "No matching predictions" : "No predictions yet"}
              </h3>

              <p className="text-gray-500 mt-2 max-w-md">
                {search
                  ? "Try searching with a different crop, state, or season."
                  : "Make your first crop yield prediction to start building your prediction history."}
              </p>

              {!search && (
                <a
                  href="/prediction"
                  className="mt-6 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  <Sprout size={19} />
                  Make Prediction
                </a>
              )}
            </div>
          ) : (
            /* Prediction List */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Crop
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Location
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Season
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Year
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Rainfall
                    </th>

                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Predicted Yield
                    </th>

                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredPredictions.map((prediction) => {
                    const input = prediction.input || {};

                    return (
                      <tr
                        key={prediction._id}
                        className="hover:bg-green-50/50 transition"
                      >
                        {/* Crop */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                              <Sprout size={20} className="text-green-600" />
                            </div>

                            <div>
                              <p className="font-semibold text-gray-900">
                                {input.Crop || "Unknown Crop"}
                              </p>

                              <p className="text-xs text-gray-400">
                                Area:{" "}
                                {input.Area !== undefined
                                  ? Number(input.Area).toLocaleString()
                                  : "—"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Location */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin size={16} className="text-gray-400" />

                            <span>{input.State || "Unknown"}</span>
                          </div>
                        </td>

                        {/* Season */}
                        <td className="px-6 py-5">
                          <span className="inline-flex px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium">
                            {input.Season || "—"}
                          </span>
                        </td>

                        {/* Year */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-gray-700">
                            <CalendarDays size={16} className="text-gray-400" />

                            <span>{input.Crop_Year || "—"}</span>
                          </div>
                        </td>

                        {/* Rainfall */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-gray-700">
                            <CloudRain size={16} className="text-gray-400" />

                            <span>
                              {input.Annual_Rainfall !== undefined
                                ? `${Number(
                                    input.Annual_Rainfall,
                                  ).toLocaleString()}`
                                : "—"}
                            </span>
                          </div>
                        </td>

                        {/* Yield */}
                        <td className="px-6 py-5 text-right">
                          <p className="text-lg font-bold text-green-600">
                            {prediction.predictedYield !== undefined
                              ? Number(prediction.predictedYield).toFixed(2)
                              : "—"}
                          </p>

                          <p className="text-xs text-gray-400">
                            predicted yield
                          </p>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-5 text-right">
                          <p className="text-sm font-medium text-gray-700">
                            {prediction.createdAt
                              ? new Date(
                                  prediction.createdAt,
                                ).toLocaleDateString()
                              : "—"}
                          </p>

                          <p className="text-xs text-gray-400">
                            {prediction.createdAt
                              ? new Date(
                                  prediction.createdAt,
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : ""}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PredictionHistory;
