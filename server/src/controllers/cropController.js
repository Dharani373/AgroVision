const Crop = require("../models/Crop");
const Farm = require("../models/Farm");

const createCrop = async (req, res) => {
  try {
    const { farmId } = req.params;

    const { name, variety, area, plantingDate, expectedHarvestDate, season } =
      req.body;

    if (!name || area === undefined || !plantingDate || !season) {
      return res.status(400).json({
        success: false,
        message: "Name, area, planting date and season are required",
      });
    }

    // Make sure the farm belongs to the logged-in farmer
    const farm = await Farm.findOne({
      _id: farmId,
      owner: req.user.id,
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    const crop = await Crop.create({
      name,
      variety,
      area,
      plantingDate,
      expectedHarvestDate,
      season,
      farm: farmId,
    });

    res.status(201).json({
      success: true,
      message: "Crop created successfully",
      crop,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getFarmCrops = async (req, res) => {
  try {
    const { farmId } = req.params;

    // Verify ownership first
    const farm = await Farm.findOne({
      _id: farmId,
      owner: req.user.id,
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Farm not found",
      });
    }

    const crops = await Crop.find({
      farm: farmId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: crops.length,
      crops,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    // Verify that the crop belongs to a farm owned by the logged-in farmer
    const farm = await Farm.findOne({
      _id: crop.farm,
      owner: req.user.id,
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    const { name, variety, area, plantingDate, expectedHarvestDate, season } =
      req.body;

    crop.name = name ?? crop.name;
    crop.variety = variety ?? crop.variety;
    crop.area = area ?? crop.area;
    crop.plantingDate = plantingDate ?? crop.plantingDate;
    crop.expectedHarvestDate = expectedHarvestDate ?? crop.expectedHarvestDate;
    crop.season = season ?? crop.season;

    await crop.save();

    res.status(200).json({
      success: true,
      message: "Crop updated successfully",
      crop,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    const farm = await Farm.findOne({
      _id: crop.farm,
      owner: req.user.id,
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    await crop.deleteOne();

    res.status(200).json({
      success: true,
      message: "Crop deleted successfully",
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
  createCrop,
  getFarmCrops,
  updateCrop,
  deleteCrop,
};
