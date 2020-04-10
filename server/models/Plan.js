const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    restaurant: { type: Schema.Types.ObjectId, ref: "restaurant" },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
    hikelevel: {
      type: String,
      enum: ["Easy peasy", "Challenging", "Hard", "Mountain runner"]
    },
    shortDescr: String,
    longDescr: String,
    kms: Number,
    date: Date,
    starttime: Date,
    lunchtime: Date,
    brunch: Boolean,
    maxBookings: Number,
    bookings: Array,
    pics: Array,
    breakfast: Boolean,
    firstCourse: Array,
    secondCourse: Array,
    dessert: Array,
    drinks: Boolean,
    bread: Boolean,
    coffee: Boolean,
    status: {
      type: String,
      enum: ["publish", "draft"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("plan", planSchema);
