import { Link, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Tractor,
  Wheat,
  BarChart3,
  Lightbulb,
  User,
  LogOut,
} from "lucide-react";

const Sidebar = ({ activePage }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getLinkClass = (page) => {
    return activePage === page
      ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 text-green-700 font-semibold"
      : "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-700 transition";
  };

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 bottom-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="AgroVision"
            className="w-11 h-11 rounded-full object-cover"
          />

          <div>
            <h1 className="text-xl font-bold text-green-700">AgroVision</h1>

            <p className="text-xs text-gray-400">Smart Agriculture</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-4">
          Main Menu
        </p>

        <nav className="space-y-2">
          <Link to="/dashboard" className={getLinkClass("dashboard")}>
            <LayoutDashboard size={19} />
            Dashboard
          </Link>

          <Link to="/farms" className={getLinkClass("farms")}>
            <Tractor size={19} />
            My Farms
          </Link>

          <Link to="/prediction" className={getLinkClass("prediction")}>
            <Wheat size={19} />
            Crop Prediction
          </Link>

          <Link to="/prediction-history" className={getLinkClass("history")}>
            <BarChart3 size={19} />
            Prediction History
          </Link>
        </nav>

        {/* Account */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mt-8 mb-4">
          Account
        </p>

        <nav className="space-y-2">
          <Link to="/insights" className={getLinkClass("insights")}>
            <Lightbulb size={19} />
            Agricultural Insights
          </Link>

          <Link to="/profile" className={getLinkClass("profile")}>
            <User size={19} />
            Profile
          </Link>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition"
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
