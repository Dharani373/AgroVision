const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    variety: {
      type: String,
      trim: true,
    },

    area: {
      type: Number,
      required: true,
      min: 0,
    },

    plantingDate: {
      type: Date,
      required: true,
    },

    expectedHarvestDate: {
      type: Date,
    },

    season: {
      type: String,
      required: true,
      trim: true,
    },

    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Crop", cropSchema);
