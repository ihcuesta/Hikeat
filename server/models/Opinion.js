const mongoose = require('mongoose');

const opinionSchema = new mongoose.Schema({
  user: userSchema,
  restaurant: restaurantSchema,
  plan: planSchema,
  date: Date,
  text: String,
  rating: {
    type: Number,
    enum: [ 1, 2, 3, 4, 5 ]
  }
});

module.exports = mongoose.model('opinion', opinionSchema);