const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: Schema.Types.ObjectId,
  plan: Schema.Types.ObjectId,
  numhikers: Number
});

module.exports = mongoose.model("booking", bookingSchema);
