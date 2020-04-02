const mongoose = require('mongoose');

const breakfastSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  restaurant: Schema.Types.ObjectId,
  food: Array,
  drink: Array,
});

module.exports = mongoose.model('breakfast', breakfastSchema);