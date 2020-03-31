const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  owner: userSchema,
  kind: {
    type: String,
    enum: [
        "Traditional",
        "Tapas",
        "Asian",
        "Italian",
        "American"
    ]
  },
  phone: Number,
  website: String,
  email: String,
  schedule: Date,
  location: String,
  pics: Array,
  opinions: Array
});

module.exports = mongoose.model('restaurant', restaurantSchema);