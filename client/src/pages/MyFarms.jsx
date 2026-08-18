import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  LayoutDashboard,
  Tractor,
  Wheat,
  BarChart3,
  Lightbulb,
  User,
  LogOut,
  Plus,
  MapPin,
  Ruler,
  Droplets,
  Sprout,
  X,
  Pencil,
  Trash2,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

const MyFarms = () => {
  const navigate = useNavigate();

  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingFarm, setEditingFarm] = useState(null);
  const [deletingFarm, setDeletingFarm] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    area: "",
    soilType: "",
    irrigationType: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch farms
  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/farms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFarms(response.data.farms || response.data || []);
      } catch (error) {
        console.error("Failed to fetch farms:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError("Failed to load farms.");
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
  }, [navigate]);

  // Form input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add farm
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const token = localStorage.getItem("token");

      const farmData = {
        name: formData.name,
        location: formData.location,
        area: Number(formData.area),
        soilType: formData.soilType,
        irrigationType: formData.irrigationType,
      };

      // ================= UPDATE FARM =================
      if (editingFarm) {
        const response = await axios.put(
          `http://localhost:5000/api/farms/${editingFarm._id}`,
          farmData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const updatedFarm = response.data.farm;

        setFarms((prev) =>
          prev.map((farm) =>
            farm._id === updatedFarm._id ? updatedFarm : farm,
          ),
        );
      }

      // ================= CREATE FARM =================
      else {
        const response = await axios.post(
          "http://localhost:5000/api/farms",
          farmData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const newFarm = response.data.farm || response.data;

        setFarms((prev) => [newFarm, ...prev]);
      }

      // Reset form
      setFormData({
        name: "",
        location: "",
        area: "",
        soilType: "",
        irrigationType: "",
      });

      setEditingFarm(null);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to save farm:", error);

      setError(error.response?.data?.message || "Failed to save farm.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (farm) => {
    setEditingFarm(farm);

    setFormData({
      name: farm.name,
      location: farm.location,
      area: farm.area,
      soilType: farm.soilType,
      irrigationType: farm.irrigationType,
    });

    setError("");
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!deletingFarm) return;

    try {
      setError("");

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/farms/${deletingFarm._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setFarms((prev) => prev.filter((farm) => farm._id !== deletingFarm._id));

      setDeletingFarm(null);
    } catch (error) {
      console.error("Failed to delete farm:", error);

      setError(error.response?.data?.message || "Failed to delete farm.");

      setDeletingFarm(null);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex">
      <Sidebar activePage="farms" />

      {/* ================= MAIN ================= */}
      <main className="ml-60 flex-1">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div>
            <p className="text-xl font-semibold text-gray-900">My Farms</p>
            <p className="text-gray-500 mt-2">
              Manage and monitor all your registered farms.
            </p>
          </div>

          <button
            onClick={() => {
              setError("");
              setShowForm(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
          >
            <Plus size={19} />
            Add New Farm
          </button>
        </header>

        {/* Content */}
        <section className="p-8">
          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>

                <p className="mt-4 text-gray-500">Loading your farms...</p>
              </div>
            </div>
          ) : farms.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                <Tractor size={36} className="text-green-600" />
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mt-5">
                No farms added yet
              </h2>

              <p className="text-gray-500 mt-2">
                Add your first farm to start managing your agricultural data.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition"
              >
                <Plus size={19} />
                Add Your First Farm
              </button>
            </div>
          ) : (
            /* Farm Cards */
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {farms.map((farm) => (
                <div
                  key={farm._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition"
                >
                  {/* Farm Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                        <Sprout size={25} className="text-green-600" />
                      </div>

                      <div>
                        <h2 className="font-semibold text-gray-900">
                          {farm.name}
                        </h2>

                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <MapPin size={14} />
                          {farm.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Farm Details */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Ruler size={16} />
                        Area
                      </div>

                      <p className="font-semibold text-gray-900 mt-2">
                        {farm.area} acres
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Sprout size={16} />
                        Soil
                      </div>

                      <p className="font-semibold text-gray-900 mt-2">
                        {farm.soilType}
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4 col-span-2">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Droplets size={16} />
                        Irrigation
                      </div>

                      <p className="font-semibold text-gray-900 mt-2">
                        {farm.irrigationType}
                      </p>
                    </div>
                    {/* Actions */}
                    <div className="flex gap-3 mt-1 pt-5 border-t border-gray-100">
                      <button
                        onClick={() => handleEdit(farm)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => setDeletingFarm(farm)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ================= ADD FARM MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingFarm ? "Edit Farm" : "Add New Farm"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {editingFarm
                    ? "Update your farm details below."
                    : "Enter your farm details below."}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingFarm(null);
                }}
                className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Farm Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Green Valley Farm"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Hyderabad"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (acres)
                </label>

                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="e.g. 5.5"
                  min="0"
                  step="0.01"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Soil */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soil Type
                </label>

                <input
                  type="text"
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleChange}
                  placeholder="e.g. Loamy"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Irrigation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Irrigation Type
                </label>

                <input
                  type="text"
                  name="irrigationType"
                  value={formData.irrigationType}
                  onChange={handleChange}
                  placeholder="e.g. Drip"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingFarm(null);
                  }}
                  className="flex-1 px-5 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition disabled:opacity-50"
                >
                  {submitting
                    ? editingFarm
                      ? "Updating..."
                      : "Adding..."
                    : editingFarm
                      ? "Update Farm"
                      : "Add Farm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingFarm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
              <Trash2 size={22} className="text-red-500" />
            </div>

            {/* Heading */}
            <h2 className="text-xl font-semibold text-gray-900 mt-5">
              Delete Farm?
            </h2>

            {/* Description */}
            <p className="text-gray-500 mt-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700">
                {deletingFarm.name}
              </span>
              ?
            </p>

            <p className="text-sm text-gray-400 mt-2">
              This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeletingFarm(null)}
                className="flex-1 px-5 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFarms;
