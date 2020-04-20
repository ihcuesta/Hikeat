const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const Plan = require("../models/Plan");
const _ = require("lodash");
const passport = require("passport");

// New booking
router.post("/new", async (req, res, next) => {
  const { planid, restid, numhikers, comments } = req.body;
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
      restid,
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

// All bookings
router.get("/all", async (req, res, next) => {
  try {
    const getBooking = await Booking.find({
      user: req.user._id
    })
      .populate("restid")
      .populate("planid");
    return res.status(200).json({ getBooking });
  } catch (error) {
    console.log("Error while retrieving booking: ", error);
    return res.status(500).json({ message: "Impossible to get the booking" });
  }
});

// Detail of booking
router.get("/:id", async (req, res, next) => {
  try {
    const getBooking = await Booking.findOne({
      _id: req.params.id
    })
      .populate("restid")
      .populate("planid");
    return res.status(200).json({ getBooking });
  } catch (error) {
    console.log("Error while retrieving booking: ", error);
    return res.status(500).json({ message: "Impossible to get the booking" });
  }
});

// Edit booking
router.get("/:id/edit", async (req, res, next) => {
  try {
    const bookingToEdit = await Booking.findOne({
      _id: req.params.id
    });

    if (String(bookingToEdit.user) === String(req.user._id)) {
      console.log(
        "Acceso permitido" + bookingToEdit.user + "  " + req.user._id
      );
      return res.status(200).json({ bookingToEdit });
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
  const { numhikers, comments } = req.body;
  try {
    const bookingToEdit = await Booking.findOne({
      _id: req.params.id
    });

    if (String(bookingToEdit.user) === String(req.user._id)) {
      const bookingUpdated = await Booking.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          $set: {
            numhikers,
            comments
          }
        }
      );
      return res.status(200).json({ bookingUpdated });
    } else {
      console.log("Only the owner is allowed to edit this booking");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log("Error trying to update the booking details: ", err);
    return status(500).json({
      message: "Error trying to update the booking details"
    });
  }
});

// Delete booking
router.post("/:id/delete", async (req, res, next) => {
  try {
    let bookingCheck = await Booking.findOne({
      _id: req.params.id
    });

    if (String(bookingCheck.user) === String(req.user._id)) {
      const bookingDeleted = await Booking.findOneAndRemove({
        _id: req.params.id
      });
      return res.status(200).json({ bookingDeleted });
    } else {
      console.log("Only the owner is allowed to delete this booking");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log("Error trying to delete the booking: ", err);
    return status(500).json({
      message: "Error trying to delete the booking"
    });
  }
});

module.exports = router;
