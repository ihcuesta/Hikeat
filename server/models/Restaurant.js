const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    owner: { type: Schema.Types.ObjectId, ref: "user" },
    kind: {
      type: String,
      enum: ["Traditional", "Tapas", "Asian", "Italian", "American"]
    },
    descr: String,
    phone: Number,
    website: String,
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    image5: String,
    email: String,
    region: String,
    city: String,
    address: String,
    allergenCard: Boolean,
    dogs: Boolean,
    terrace: Boolean,
    kids: Boolean,
    rateAv: Number,
    totalRate: Number,
    totalComments: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("restaurant", restaurantSchema);
