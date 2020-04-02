const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  restaurant: Schema.Types.ObjectId,
  firstCourse: Array,
  secondCourse: Array,
  dessert: Array,
  drinks: Boolean,
  bread: Boolean,
  coffee: Boolean
});

module.exports = mongoose.model('menu', menuSchema);