const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    planid: { type: Schema.Types.ObjectId, ref: "plan" },
    restid: { type: Schema.Types.ObjectId, ref: "restaurant" },
    numhikers: Number,
    comments: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("booking", bookingSchema);
