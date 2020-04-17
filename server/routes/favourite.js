const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Plan = require("../models/Plan");
const Favourite = require("../models/Favourite");
const _ = require("lodash");
const passport = require("passport");

// New favourite
router.post("/:id/new", async (req, res, next) => {
  try {
    // Check if there is already a booking for that plan and with that user
    // const registeredBooking = await Booking.findOne({ user: req.user._id });
    // if (registeredBooking) {
    //   console.log(
    //     `There are bookings for this user, modify the booking created`
    //   );
    //   return res.status(400).json({
    //     isNewBooking: false
    //   });
    // }

    const newFavourite = await Favourite.create({
      user: req.user._id,
      planid: req.params.id
    });
    console.log("Favourite created");
    return res.status(200).json({ newFavourite });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Impossible to create new favourite" });
  }
});

// Delete favourite
router.post("/:id/delete", async (req, res, next) => {
  try {
    let favouriteCheck = await Favourite.findOne({
      planid: req.params.id
    });

    if (String(favouriteCheck.user) === String(req.user._id)) {
      const favouriteDeleted = await Favourite.findOneAndRemove({
        planid: req.params.id
      });
      return res.status(200).json({ favouriteDeleted });
    } else {
      console.log("Only the owner is allowed to delete his favourites");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log("Error trying to delete the favourite: ", err);
    return status(500).json({
      message: "Error trying to delete the favourite"
    });
  }
});

module.exports = router;
