const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const Plan = require("../models/Plan");
const _ = require("lodash");
const passport = require("passport");

// New booking
router.post("/new", async (req, res, next) => {
  const { planid, numhikers, comments } = req.body;
  try {
    // Check if there is already a booking for that plan and with that user
    const registeredBooking = await Booking.findOne({ user: req.user._id });
    if (registeredBooking) {
      console.log(
        `There are bookings for this user, modify the booking created`
      );
      return res.status(400).json({
        isNewBooking: false
      });
    }

    const newBooking = await Booking.create({
      user: req.user._id,
      planid,
      numhikers,
      comments
    });
    console.log("Booking created");
    return res.status(200).json({ isNewBooking: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Impossible to create new booking" });
  }
});

// Detail page of restaurant
router.get("/:id", async (req, res, next) => {
  try {
    const restaurantId = await Restaurant.findOne({
      _id: req.params.id
    }).populate("owner");
    return res.status(200).json({ restaurantId });
  } catch (error) {
    console.log("Error while retrieving restaurant ID: ", error);
    return res
      .status(500)
      .json({ message: "Impossible to get the restaurant" });
  }
});

// Edit page for a celebrity ID
router.get("/:id/edit", async (req, res, next) => {
  try {
    const restaurantToEdit = await Restaurant.findOne({
      _id: req.params.id
    });

    if (String(restaurantToEdit.owner) === String(req.user._id)) {
      console.log(
        "Acceso permitido" + restaurantToEdit.owner + "  " + req.user._id
      );
      return res.status(200).json({ restaurantToEdit });
    } else {
      console.log("Only the owner is allowed to edit this restaurant");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log(
      "Error trying to get information to edit the restaurant: ",
      err
    );
    return status(500).json({
      message: "Error trying to get information to edit the restaurant"
    });
  }
});

// Send the updates after edit
router.put("/:id/edit", async (req, res, next) => {
  const {
    name,
    kind,
    phone,
    website,
    email,
    region,
    image1,
    image2,
    image3,
    image4,
    image5,
    city,
    address,
    pics,
    allergenCard,
    dogs,
    terrace,
    kids
  } = req.body;
  try {
    const planToEdit = await Plan.findOne({
      _id: req.params.id
    });

    if (String(planToEdit.owner) === String(req.user._id)) {
      const restaurantUpdated = await Restaurant.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          $set: {
            name,
            kind,
            phone,
            website,
            email,
            image1,
            image2,
            image3,
            image4,
            image5,
            region,
            city,
            address,
            pics,
            allergenCard,
            dogs,
            terrace,
            kids
          }
        }
      );
      return res.status(200).json({ restaurantUpdated });
    } else {
      console.log("Only the owner is allowed to edit this restaurant");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log("Error trying to update the restaurant details: ", err);
    return status(500).json({
      message: "Error trying to update the restaurant details"
    });
  }
});

// Send delete action
router.post("/:id/delete", async (req, res, next) => {
  try {
    let restaurantCheck = await Plan.findOne({
      _id: req.params.id
    });

    if (String(restaurantCheck.owner) === String(req.user._id)) {
      const restaurantDeleted = await Restaurant.findOneAndRemove({
        _id: req.params.id
      });
      return res.status(200).json({ restaurantDeleted });
    } else {
      console.log("Only the owner is allowed to delete this restaurant");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log("Error trying to delete the restaurant: ", err);
    return status(500).json({
      message: "Error trying to delete the restaurant"
    });
  }
});

module.exports = router;
