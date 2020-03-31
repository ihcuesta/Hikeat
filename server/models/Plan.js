const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  hikename: String,
  restaurant: restaurantSchema,
  owner: userSchema,
  hikelevel: {
    type: String,
    enum: [
        "Easy peasy",
        "Challenging",
        "Hard",
        "Mountain Goat"
    ]
  },
  details: String,
  startpoint: String,
  endpoint: String,
  kms: Number,
  date: Date,
  starttime: Date,
  lunchtime: Date,
  kids: Boolean,
  kidsmenu: Boolean,
  dogshike: Boolean,
  dogsrestaurant: Boolean,
  breakfast: Boolean,
  brunch: Boolean,
  maxBookings: Number,
  bookings: Array
});

module.exports = mongoose.model('plan', planSchema);