const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  restaurant: { type: Schema.Types.ObjectId, ref: "restaurant" },
  owner: { type: Schema.Types.ObjectId, ref: "user" },
  hikelevel: {
    type: String,
    enum: ["Easy peasy", "Challenging", "Hard", "Mountain Goat"]
  },
  shortDescr: String,
  longDescr: String,
  startpoint: String,
  kms: Number,
  starttime: Date,
  lunchtime: Date,
  kids: Boolean,
  kidsMenu: Boolean,
  dogsHike: Boolean,
  dogsRestaurant: Boolean,
  brunch: Boolean,
  maxBookings: Number,
  bookings: Array,
  optVegan: Boolean,
  optCeliac: Boolean,
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
});

module.exports = mongoose.model("plan", planSchema);
