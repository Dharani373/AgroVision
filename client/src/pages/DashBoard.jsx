import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-green-50/40 text-gray-900">
      {/* ================= MOBILE HEADER ================= */}
      <div className="lg:hidden bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="AgroVision"
            className="w-10 h-10 rounded-full object-cover"
          />

          <span className="text-xl font-bold text-green-700">AgroVision</span>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed top-0 left-0 z-40
          h-screen w-64 bg-white border-r border-gray-100
          flex flex-col
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}

        <div className="px-6 py-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="AgroVision Logo"
              className="w-11 h-11 rounded-full object-cover"
            />

            <div>
              <h1 className="text-xl font-bold text-green-700">AgroVision</h1>

              <p className="text-xs text-gray-400">Smart Agriculture</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-4 py-6 space-y-2">
          <p className="px-3 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Main Menu
          </p>

          {/* Dashboard */}

          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-xl
              bg-green-50
              text-green-700
              font-semibold
            "
          >
            <span>▦</span>
            Dashboard
          </button>

          {/* Farms */}

          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-gray-600
              hover:bg-green-50
              hover:text-green-700
              transition
            "
          >
            <span>🌾</span>
            My Farms
          </button>

          {/* Prediction */}

          <button
            onClick={() => navigate("/predict")}
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-gray-600
              hover:bg-green-50
              hover:text-green-700
              transition
            "
          >
            <span>📊</span>
            Crop Prediction
          </button>

          {/* History */}

          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-gray-600
              hover:bg-green-50
              hover:text-green-700
              transition
            "
          >
            <span>📈</span>
            Prediction History
          </button>

          <p className="px-3 pt-6 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Account
          </p>

          {/* Insights */}

          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-gray-600
              hover:bg-green-50
              hover:text-green-700
              transition
            "
          >
            <span>💡</span>
            Agricultural Insights
          </button>

          {/* Profile */}

          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-gray-600
              hover:bg-green-50
              hover:text-green-700
              transition
            "
          >
            <span>👤</span>
            Profile
          </button>
        </nav>

        {/* Logout */}

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-red-500
              hover:bg-red-50
              transition
            "
          >
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <main className="lg:ml-64">
        {/* ================= TOP NAVBAR ================= */}

        <header className="hidden lg:flex bg-white border-b border-gray-100 px-8 py-4 items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Dashboard</p>

            <h2 className="text-xl font-semibold text-gray-900">
              Agricultural Overview
            </h2>
          </div>

          {/* User */}

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-gray-400">{user?.email || ""}</p>
            </div>

            <div
              className="
                w-11 h-11
                rounded-full
                bg-green-100
                flex items-center justify-center
                text-green-700
                font-bold
              "
            >
              {(user?.name || "U").charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* ================= DASHBOARD BODY ================= */}

        <div className="px-5 sm:px-8 py-8 max-w-7xl mx-auto">
          {/* Welcome */}

          <div className="mb-8">
            <p className="text-green-600 font-semibold text-sm">
              WELCOME BACK 🌱
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Good morning, {user?.name || "Farmer"}!
            </h1>

            <p className="text-gray-500 mt-2">
              Here's an overview of your agricultural activities.
            </p>
          </div>

          {/* ================= STAT CARDS ================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {/* Farms */}

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">My Farms</p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">3</p>

                  <p className="text-xs text-green-600 mt-2">Active farms</p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                  🌾
                </div>
              </div>
            </div>

            {/* Predictions */}

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Predictions</p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">12</p>

                  <p className="text-xs text-green-600 mt-2">+3 this month</p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                  📊
                </div>
              </div>
            </div>

            {/* Average Yield */}

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Average Yield</p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">2.35</p>

                  <p className="text-xs text-green-600 mt-2">Predicted yield</p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                  🌱
                </div>
              </div>
            </div>

            {/* Active Crops */}

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Crops</p>

                  <p className="text-3xl font-bold text-gray-900 mt-2">5</p>

                  <p className="text-xs text-green-600 mt-2">
                    Across your farms
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                  🍃
                </div>
              </div>
            </div>
          </div>

          {/* ================= MAIN GRID ================= */}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
            {/* Yield Overview */}

            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Yield Overview
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Your recent crop yield predictions
                  </p>
                </div>

                <span className="text-sm text-green-600 font-medium">
                  Last 6 months
                </span>
              </div>

              {/* Simple chart */}

              <div className="h-64 flex items-end justify-between gap-4 px-4">
                {[45, 65, 52, 75, 68, 90].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-3"
                  >
                    <div className="w-full flex justify-center items-end h-52">
                      <div
                        className="
                          w-10 sm:w-14
                          bg-green-500
                          hover:bg-green-600
                          rounded-t-lg
                          transition
                        "
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    </div>

                    <span className="text-xs text-gray-400">
                      {["Mar", "Apr", "May", "Jun", "Jul", "Aug"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>

              <p className="text-sm text-gray-400 mt-1 mb-5">
                Manage your agricultural activities
              </p>

              <button
                onClick={() => navigate("/predict")}
                className="
                  w-full
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  rounded-xl
                  px-4 py-4
                  text-left
                  transition
                  mb-3
                "
              >
                <div className="font-semibold">📊 Predict Crop Yield</div>

                <div className="text-xs text-green-100 mt-1">
                  Get an AI-powered yield prediction
                </div>
              </button>

              <button
                className="
                  w-full
                  border border-gray-200
                  hover:border-green-400
                  hover:bg-green-50
                  rounded-xl
                  px-4 py-4
                  text-left
                  transition
                  mb-3
                "
              >
                <div className="font-semibold text-gray-800">
                  🌾 Add New Farm
                </div>

                <div className="text-xs text-gray-400 mt-1">
                  Register your farm
                </div>
              </button>

              <button
                className="
                  w-full
                  border border-gray-200
                  hover:border-green-400
                  hover:bg-green-50
                  rounded-xl
                  px-4 py-4
                  text-left
                  transition
                "
              >
                <div className="font-semibold text-gray-800">
                  📈 View History
                </div>

                <div className="text-xs text-gray-400 mt-1">
                  Review previous predictions
                </div>
              </button>
            </div>
          </div>

          {/* ================= RECENT PREDICTIONS ================= */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-6 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Recent Predictions
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Your latest crop yield predictions
                </p>
              </div>

              <button className="text-sm font-semibold text-green-600 hover:text-green-700">
                View All →
              </button>
            </div>

            {/* Table */}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-500">
                      Crop
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-gray-500">
                      Location
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-gray-500">
                      Year
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-gray-500">
                      Predicted Yield
                    </th>

                    <th className="text-left px-6 py-4 font-semibold text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t border-gray-100 hover:bg-green-50/40">
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      🌾 Rice
                    </td>

                    <td className="px-6 py-4 text-gray-500">Telangana</td>

                    <td className="px-6 py-4 text-gray-500">2026</td>

                    <td className="px-6 py-4 font-semibold text-green-600">
                      2.35
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        Completed
                      </span>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-100 hover:bg-green-50/40">
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      🌾 Wheat
                    </td>

                    <td className="px-6 py-4 text-gray-500">Karnataka</td>

                    <td className="px-6 py-4 text-gray-500">2026</td>

                    <td className="px-6 py-4 font-semibold text-green-600">
                      3.12
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        Completed
                      </span>
                    </td>
                  </tr>

                  <tr className="border-t border-gray-100 hover:bg-green-50/40">
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      🌽 Maize
                    </td>

                    <td className="px-6 py-4 text-gray-500">Andhra Pradesh</td>

                    <td className="px-6 py-4 text-gray-500">2026</td>

                    <td className="px-6 py-4 font-semibold text-green-600">
                      2.87
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= INSIGHT ================= */}

          <div className="mt-6 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 sm:p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-green-100 text-sm font-semibold">
                  AGRICULTURAL INSIGHT
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  Make smarter decisions with AgroVision
                </h3>

                <p className="text-green-100 mt-2 max-w-2xl">
                  Use historical agricultural data and AI-powered predictions to
                  better understand your crop yield potential.
                </p>
              </div>

              <button
                onClick={() => navigate("/predict")}
                className="
                  bg-white
                  text-green-700
                  font-semibold
                  px-6 py-3
                  rounded-xl
                  hover:bg-green-50
                  transition
                  whitespace-nowrap
                "
              >
                Make a Prediction →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
