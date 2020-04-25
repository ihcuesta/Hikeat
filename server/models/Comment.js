const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    restaurant: { type: Schema.Types.ObjectId, ref: "restaurant" },
    date: String,
    comment: String,
    stars: {
      type: Number,
      enum: [1, 2, 3, 4, 5]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("comment", commentSchema);
