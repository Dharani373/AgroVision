import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  LayoutDashboard,
  Tractor,
  BarChart3,
  History,
  Lightbulb,
  User,
  LogOut,
  Mail,
  ShieldCheck,
  CalendarDays,
  ArrowLeft,
  Sprout,
  UserRound,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------
  // Fetch logged-in user
  // --------------------------------------------------

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUser(response.data.user);

          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
      } catch (error) {
        console.error("Profile error:", error);

        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // --------------------------------------------------
  // Logout
  // --------------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // --------------------------------------------------
  // Get first letter of name
  // --------------------------------------------------

  const getInitial = () => {
    if (!user?.name) {
      return "U";
    }

    return user.name.charAt(0).toUpperCase();
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // No user
  // --------------------------------------------------

  if (!user) {
    return null;
  }

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

        <div className="flex-1 px-4 py-6">
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
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-700 transition"
            >
              <Lightbulb className="w-5 h-5" />
              <span>Agricultural Insights</span>
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 text-green-700 font-semibold"
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
        {/* =====================================================
            TOP HEADER
        ===================================================== */}

        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div>
            <p className="text-sm text-gray-400">Account</p>

            <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
          </div>

          {/* User */}

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-gray-800">{user.name}</p>

              <p className="text-xs text-gray-400">{user.email}</p>
            </div>

            <div className="w-11 h-11 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg">
              {getInitial()}
            </div>
          </div>
        </header>

        {/* =====================================================
            PAGE CONTENT
        ===================================================== */}

        <div className="p-8 max-w-6xl mx-auto">
          {/* Back */}

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>

          {/* Heading */}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

            <p className="text-gray-500 mt-2">
              View your AgroVision account information.
            </p>
          </div>

          {/* =====================================================
              PROFILE CARD
          ===================================================== */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Green Cover */}

            <div className="relative h-28 bg-gradient-to-r from-green-700 via-green-600 to-green-500">
              <Sprout className="absolute right-10 top-1/2 -translate-y-1/2 w-24 h-24 text-green-300 opacity-20" />
            </div>

            {/* Profile information */}

            <div className="px-8 pb-7">
              <div className="flex items-center gap-5">
                {/* Avatar */}

                <div className="-mt-10 relative z-10">
                  <div className="w-24 h-24 rounded-full bg-green-100 border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-green-700">
                    {getInitial()}
                  </div>
                </div>

                {/* Name */}

                <div className="pt-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.name}
                  </h2>

                  <p className="text-gray-500 mt-1">{user.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              INFORMATION CARDS
          ===================================================== */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                  <UserRound className="w-5 h-5 text-green-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Personal Information
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    Your basic account details
                  </p>
                </div>
              </div>

              {/* Name */}

              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Full Name
                </p>

                <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                  <User className="w-5 h-5 text-gray-400" />

                  <span className="text-gray-800">{user.name}</span>
                </div>
              </div>

              {/* Email */}

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Email Address
                </p>

                <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                  <Mail className="w-5 h-5 text-gray-400" />

                  <span className="text-gray-800 break-all">{user.email}</span>
                </div>
              </div>
            </div>

            {/* =================================================
                ACCOUNT INFORMATION
            ================================================= */}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Account Information
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    Your AgroVision account
                  </p>
                </div>
              </div>

              {/* Account Type */}

              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Account Type
                </p>

                <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                  <ShieldCheck className="w-5 h-5 text-green-600" />

                  <span className="text-gray-800 capitalize">
                    {user.role || "Farmer"}
                  </span>
                </div>
              </div>

              {/* Member Since */}

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Member Since
                </p>

                <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                  <CalendarDays className="w-5 h-5 text-gray-400" />

                  <span className="text-gray-800">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Not available"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              SECURITY CARD
          ===================================================== */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  Account Security
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Your AgroVision account uses secure authentication.
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />

                  <span className="text-sm text-green-700 font-medium">
                    Account protected
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom spacing */}

          <div className="h-8" />
        </div>
      </main>
    </div>
  );
};

export default Profile;
