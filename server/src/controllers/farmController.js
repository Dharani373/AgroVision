const Farm = require("../models/Farm");

const createFarm = async (req, res) => {
  try {
    const { name, location, area, soilType, irrigationType } = req.body;

    if (
      !name ||
      !location ||
      area === undefined ||
      !soilType ||
      !irrigationType
    ) {
      return res.status(400).json({
        success: false,
        message: "All farm fields are required",
      });
    }

    const farm = await Farm.create({
      name,
      location,
      area,
      soilType,
      irrigationType,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Farm created successfully",
      farm,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getMyFarms = async (req, res) => {
  try {
    const farms = await Farm.find({
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: farms.length,
      farms,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getFarmById = async (req, res) => {
  try {
    const farm = await Farm.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    res.status(200).json({
      success: true,
      farm,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    const { name, location, area, soilType, irrigationType } = req.body;

    farm.name = name ?? farm.name;
    farm.location = location ?? farm.location;
    farm.area = area ?? farm.area;
    farm.soilType = soilType ?? farm.soilType;
    farm.irrigationType = irrigationType ?? farm.irrigationType;

    await farm.save();

    res.status(200).json({
      success: true,
      message: "Farm updated successfully",
      farm,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    await farm.deleteOne();

    res.status(200).json({
      success: true,
      message: "Farm deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createFarm,
  getMyFarms,
  getFarmById,
  updateFarm,
  deleteFarm,
};
