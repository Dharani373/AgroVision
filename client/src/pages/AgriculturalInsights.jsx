import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Tractor,
  BarChart3,
  History,
  Lightbulb,
  User,
  LogOut,
  Sprout,
  Droplets,
  Wheat,
  FlaskConical,
  Sun,
  CloudRain,
  Leaf,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const AgriculturalInsights = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getInitial = () => {
    if (!user?.name) return "U";
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-green-50 flex">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-gray-200 flex flex-col z-20">
        {/* Logo */}

        <div className="px-6 py-5 border-b border-gray-100">
          <Link to="/dashboard" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="AgroVision"
              className="w-11 h-11 rounded-full object-cover"
            />

            <div>
              <h1 className="text-xl font-bold text-green-700">AgroVision</h1>

              <p className="text-xs text-gray-400">Smart Agriculture</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}

        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-4">
            Main Menu
          </p>

          <nav className="space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-700 transition"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/farms"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-700 transition"
            >
              <Tractor className="w-5 h-5" />
              <span>My Farms</span>
            </Link>

            <Link
              to="/prediction"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-700 transition"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Crop Prediction</span>
            </Link>

            <Link
              to="/prediction-history"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-700 transition"
            >
              <History className="w-5 h-5" />
              <span>Prediction History</span>
            </Link>
          </nav>

          {/* Account */}

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mt-8 mb-4">
            Account
          </p>

          <nav className="space-y-1">
            <Link
              to="/insights"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 text-green-700 font-semibold"
            >
              <Lightbulb className="w-5 h-5" />
              <span>Agricultural Insights</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-700 transition"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </nav>
        </div>

        {/* Logout */}

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="ml-60 flex-1 min-h-screen">
        {/* Header */}

        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div>
            <p className="text-sm text-gray-400">Agriculture</p>

            <h2 className="text-xl font-semibold text-gray-900">
              Agricultural Insights
            </h2>
          </div>

          {/* User */}

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-gray-800">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-gray-400">{user?.email || ""}</p>
            </div>

            <div className="w-11 h-11 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg">
              {getInitial()}
            </div>
          </div>
        </header>

        {/* =====================================================
            PAGE CONTENT
        ===================================================== */}

        <div className="p-8 max-w-7xl mx-auto">
          {/* Page heading */}

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold text-gray-900">
                Agricultural Insights
              </h1>
            </div>

            <p className="text-gray-500 max-w-2xl">
              Practical recommendations to help you manage your farms, crops,
              irrigation, soil, and agricultural activities more effectively.
            </p>
          </div>

          {/* =====================================================
              OVERVIEW BANNER
          ===================================================== */}

          <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-2xl p-7 text-white mb-7 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Sprout className="w-6 h-6" />

                <span className="font-semibold">Smart Agriculture</span>
              </div>

              <h2 className="text-2xl font-bold mb-2">
                Make better decisions for your farm.
              </h2>

              <p className="text-green-50 leading-relaxed">
                AgroVision brings together agricultural data, crop information,
                and AI-powered predictions to help you understand your farming
                activities and make informed decisions.
              </p>
            </div>

            <Sprout className="absolute right-8 -bottom-8 w-40 h-40 text-white opacity-10" />
          </div>

          {/* =====================================================
              INSIGHT CARDS
          ===================================================== */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            {/* Irrigation */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                <Droplets className="w-6 h-6 text-blue-500" />
              </div>

              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                Irrigation
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                Maintain appropriate soil moisture and avoid unnecessary water
                usage by following your crop's irrigation requirements.
              </p>

              <div className="flex items-center gap-2 mt-5 text-sm text-green-600 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Water management
              </div>
            </div>

            {/* Soil */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
                <FlaskConical className="w-6 h-6 text-amber-600" />
              </div>

              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                Soil Management
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                Understanding soil characteristics can help determine suitable
                crops and improve nutrient management.
              </p>

              <div className="flex items-center gap-2 mt-5 text-sm text-green-600 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Soil health
              </div>
            </div>

            {/* Crop Management */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-5">
                <Wheat className="w-6 h-6 text-green-600" />
              </div>

              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                Crop Management
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                Track crop information throughout the farming cycle and use
                historical data to support better planning.
              </p>

              <div className="flex items-center gap-2 mt-5 text-sm text-green-600 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Crop monitoring
              </div>
            </div>

            {/* Weather */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center mb-5">
                <CloudRain className="w-6 h-6 text-sky-500" />
              </div>

              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                Weather Awareness
              </h3>

              <p className="text-sm text-gray-500 leading-relaxed">
                Rainfall and temperature conditions can strongly influence crop
                development and expected yield.
              </p>

              <div className="flex items-center gap-2 mt-5 text-sm text-green-600 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Climate factors
              </div>
            </div>
          </div>

          {/* =====================================================
              RECOMMENDATIONS
          ===================================================== */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main recommendations */}

            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Farming Recommendations
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    General practices for better farm management.
                  </p>
                </div>

                <Leaf className="w-6 h-6 text-green-600" />
              </div>

              <div className="space-y-4">
                {/* Recommendation 1 */}

                <div className="flex gap-4 p-4 rounded-xl bg-green-50 border border-green-100">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Sprout className="w-5 h-5 text-green-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Monitor crop conditions regularly
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Keep your crop records updated so that farming decisions
                      can be based on accurate information.
                    </p>
                  </div>
                </div>

                {/* Recommendation 2 */}

                <div className="flex gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-5 h-5 text-blue-500" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Use water efficiently
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Avoid excessive irrigation and consider the crop, soil
                      type, rainfall, and local conditions when planning water
                      usage.
                    </p>
                  </div>
                </div>

                {/* Recommendation 3 */}

                <div className="flex gap-4 p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="w-5 h-5 text-amber-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Manage fertilizer carefully
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Consider soil characteristics and crop requirements before
                      applying fertilizers. Avoid unnecessary application.
                    </p>
                  </div>
                </div>

                {/* Recommendation 4 */}

                <div className="flex gap-4 p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Use prediction history
                    </h3>

                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Compare previous predictions and crop information to
                      identify patterns that may help with future planning.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seasonal card */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-yellow-50 flex items-center justify-center">
                  <Sun className="w-6 h-6 text-yellow-500" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">Seasonal Planning</h2>

                  <p className="text-xs text-gray-400">Plan ahead</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Consider rainfall
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Review expected rainfall before making irrigation decisions.
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <p className="text-sm font-semibold text-gray-800">
                    Review soil conditions
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Maintain suitable soil conditions for the selected crop.
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-5">
                  <p className="text-sm font-semibold text-gray-800">
                    Track temperature
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Temperature can influence crop growth and expected
                    agricultural productivity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              IMPORTANT NOTE
          ===================================================== */}

          <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Important</h3>

              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                These insights are general agricultural guidance and should be
                considered alongside local weather, soil conditions, crop
                requirements, and professional agricultural advice.
              </p>
            </div>
          </div>

          {/* Prediction CTA */}

          <div className="mt-6 flex justify-end">
            <Link
              to="/prediction"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl transition shadow-sm"
            >
              Make a Crop Prediction
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgriculturalInsights;
