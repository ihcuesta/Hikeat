const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: userSchema,
  plan: planSchema,
  numhikers: Number
});

module.exports = mongoose.model('booking', bookingSchema);