import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sprout,
  Wheat,
  BarChart3,
  Plus,
  ArrowRight,
  TrendingUp,
  Leaf,
  Tractor,
  ClipboardList,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalFarms: 0,
    totalPredictions: 0,
    cropsTracked: 0,
    averageYield: 0,
  });

  const [recentPredictions, setRecentPredictions] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get dashboard data

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        // ================= DASHBOARD DATA =================
        const dashboardResponse = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (dashboardResponse.data.success) {
          setStats(dashboardResponse.data.stats);
          setRecentPredictions(dashboardResponse.data.recentPredictions || []);
        }

        // ================= FARM DATA =================
        const farmsResponse = await axios.get(
          "http://localhost:5000/api/farms",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const farms = farmsResponse.data.farms || farmsResponse.data || [];

        console.log("Dashboard farms:", farms);
        console.log("FARM COUNT =", farms.length);

        setStats((prev) => ({
          ...prev,
          totalFarms: farms.length,
        }));

        // ================= LOGGED-IN USER =================
        const userResponse = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (userResponse.data.success) {
          setUser(userResponse.data.user);
        }
      } catch (error) {
        console.error("Dashboard error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  // First letter of user's name
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  const userName = user?.name || "User";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 flex">
      <Sidebar activePage="dashboard" />
      {/* ================= MAIN CONTENT ================= */}
      <main className="ml-60 flex-1">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div>
            <p className="text-sm text-gray-400">Dashboard</p>

            <h2 className="text-xl font-semibold text-gray-900">
              Agricultural Overview
            </h2>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-gray-800">{userName}</p>

              <p className="text-xs text-gray-400">{user?.email || ""}</p>
            </div>

            {/* First letter only */}
            <div className="w-11 h-11 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg">
              {userInitial}
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <section className="p-8">
          {/* Welcome */}
          <div className="mb-8">
            <p className="text-2xl font-semibold text-green-600 uppercase tracking-wide">
              Welcome back
            </p>

            <p className="text-gray-500 mt-2">
              Here's an overview of your agricultural activities.
            </p>
          </div>

          {/* ================= STAT CARDS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
            {/* Farms */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">My Farms</p>

                  <h3 className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalFarms}
                  </h3>

                  <p className="text-sm text-green-600 mt-2">
                    {stats.totalFarms === 0
                      ? "No farms added"
                      : `${stats.totalFarms} active farm${stats.totalFarms > 1 ? "s" : ""}`}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Tractor size={23} className="text-green-600" />
                </div>
              </div>
            </div>

            {/* Predictions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">Predictions</p>

                  <h3 className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalPredictions}
                  </h3>

                  <p className="text-sm text-green-600 mt-2">
                    {stats.totalPredictions === 0
                      ? "No predictions yet"
                      : "Crop yield predictions"}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <BarChart3 size={23} className="text-green-600" />
                </div>
              </div>
            </div>

            {/* Average Yield */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">Average Yield</p>

                  <h3 className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.averageYield}
                  </h3>

                  <p className="text-sm text-green-600 mt-2">
                    {stats.totalPredictions === 0
                      ? "No yield data"
                      : "Predicted average yield"}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <TrendingUp size={23} className="text-green-600" />
                </div>
              </div>
            </div>

            {/* Crops */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Crops</p>

                  <h3 className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.cropsTracked}
                  </h3>

                  <p className="text-sm text-green-600 mt-2">
                    {stats.cropsTracked === 0
                      ? "No crops tracked"
                      : "Across your farms"}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <Leaf size={23} className="text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= LOWER SECTION ================= */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Predictions */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Predictions
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Your latest crop yield predictions
                  </p>
                </div>

                {recentPredictions.length > 0 && (
                  <Link
                    to="/prediction-history"
                    className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center gap-1"
                  >
                    View all
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>

              {recentPredictions.length === 0 ? (
                /* Empty State */
                <div className="min-h-[300px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
                    <ClipboardList size={30} className="text-green-600" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900">
                    No predictions yet
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Make your first crop yield prediction to see it here.
                  </p>

                  <Link
                    to="/prediction"
                    className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
                  >
                    <TrendingUp size={18} />
                    Make Prediction
                  </Link>
                </div>
              ) : (
                /* Prediction List */
                <div className="space-y-3">
                  {recentPredictions.map((prediction, index) => (
                    <div
                      key={prediction._id || index}
                      className="flex items-center justify-between p-4 rounded-xl bg-green-50 border border-green-100"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center">
                          <Sprout size={22} className="text-green-600" />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {prediction.cropName ||
                              prediction.crop ||
                              "Crop Prediction"}
                          </p>

                          <p className="text-sm text-gray-500">
                            {prediction.createdAt
                              ? new Date(
                                  prediction.createdAt,
                                ).toLocaleDateString()
                              : "Recent prediction"}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-green-700">
                          {prediction.predictedYield ?? prediction.yield ?? "—"}
                        </p>

                        <p className="text-xs text-gray-400">Predicted yield</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Quick Actions
              </h2>

              <p className="text-sm text-gray-500 mt-1 mb-6">
                Manage your agricultural activities
              </p>

              {/* Prediction */}
              <Link
                to="/prediction"
                className="block bg-green-600 hover:bg-green-700 text-white rounded-xl p-5 transition"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 size={22} />

                  <span className="font-semibold">Predict Crop Yield</span>
                </div>

                <p className="text-sm text-green-100 mt-2">
                  Get an AI-powered yield prediction
                </p>
              </Link>

              {/* Add Farm */}
              <Link
                to="/farms"
                className="block mt-3 border border-gray-200 hover:border-green-300 hover:bg-green-50 rounded-xl p-5 transition"
              >
                <div className="flex items-center gap-3">
                  <Plus size={21} className="text-green-600" />

                  <span className="font-semibold text-gray-900">
                    Add New Farm
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">Register your farm</p>
              </Link>

              {/* History */}
              <Link
                to="/prediction-history"
                className="block mt-3 border border-gray-200 hover:border-green-300 hover:bg-green-50 rounded-xl p-5 transition"
              >
                <div className="flex items-center gap-3">
                  <ClipboardList size={21} className="text-green-600" />

                  <span className="font-semibold text-gray-900">
                    View History
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Review previous predictions
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
