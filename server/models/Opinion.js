const mongoose = require("mongoose");

const opinionSchema = new mongoose.Schema(
  {
    user: Schema.Types.ObjectId,
    restaurant: Schema.Types.ObjectId,
    plan: Schema.Types.ObjectId,
    date: Date,
    text: String,
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("opinion", opinionSchema);
