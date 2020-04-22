const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favouriteSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    planid: { type: Schema.Types.ObjectId, ref: "plan" },
    restid: { type: Schema.Types.ObjectId, ref: "restaurant" }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("favourite", favouriteSchema);
