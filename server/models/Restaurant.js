const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  owner: { type: Schema.Types.ObjectId, ref: 'user' },
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
  opinions: Array,
  allergenCard: Boolean
});

module.exports = mongoose.model('restaurant', restaurantSchema);