const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
    restaurant: { type: Schema.Types.ObjectId, ref: "restaurant" },
    hikelevel: {
      type: String,
      enum: ["Easy peasy", "Challenging", "Hard", "Mountain runner"]
    },
    region: String,
    city: String,
    shortDescr: String,
    longDescr: String,
    kms: Number,
    highlights: Array,
    date: String,
    startTime: String,
    lunchTime: String,
    brunch: Boolean,
    maxBookings: Number,
    counterBookings: Number,
    bookings: Array,
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    breakfast: Boolean,
    firstCourse: Array,
    secondCourse: Array,
    dessert: Array,
    drinks: Boolean,
    coffee: Boolean,
    bread: Boolean,
    price: Number,
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
