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
    const registeredBooking = await Booking.find({
      user: req.user._id,
      planid: planid
    });
    if (registeredBooking.length > 0) {
      console.log(
        `There are bookings for this user, modify the booking created`
      );
      return res.status(400).json({
        isNewBooking: false
      });
    }

    // Check if it's possible book or is full
    // const checkAvailability = await Plan.findOne({
    //   _id: planid
    // });

    // const remainingPlaces =
    //   checkAvailability.maxBookings - checkAvailability.counterBooking;
    // if (numhikers > remainingPlaces) {
    //   console.log(`This plan is full`);
    //   return res.status(400).json({
    //     remainingPlaces: remainingPlaces
    //   });
    // }

    const newBooking = await Booking.create({
      user: req.user._id,
      planid,
      restid,
      numhikers,
      comments
    });

    const getCounterBooking = await Plan.findOne({
      _id: planid
    });
    console.log("Esto es el plan: " + getCounterBooking);
    const counter = getCounterBooking.counterBookings;
    console.log("Esto es el counter: " + counter);
    // Increase the counter of bookings
    const counterBooking = await Plan.findOneAndUpdate(
      {
        _id: planid
      },
      {
        $set: {
          counterBookings: Number(counter) + Number(numhikers)
        }
      }
    );
    console.log("Booking created");
    return res.status(200).json({ isNewBooking: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Impossible to create new booking" });
  }
});

// All bookings of a plan
router.get("/:id/all", async (req, res, next) => {
  try {
    const getBooking = await Booking.find({
      planid: req.params.id
    }).populate("user");

    return res.status(200).json({ getBooking });
  } catch (error) {
    console.log("Error while retrieving booking: ", error);
    return res.status(500).json({ message: "Impossible to get the booking" });
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

// Get booking based of Plan ID
router.get("/ofplan/:planid", async (req, res, next) => {
  try {
    const getBooking = await Booking.find({
      planid: req.params.id
    });
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
      planid: req.params.id,
      user: req.user._id
    });
    console.log(bookingToEdit.user + " " + req.user._id);
    if (String(bookingToEdit.user) === String(req.user._id)) {
      console.log(
        "Acceso permitido" + bookingToEdit.user + "  " + req.user._id
      );
      return res.status(200).json({ bookingToEdit });
    } else {
      console.log("Only the owner is allowed to edit this booking");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log("Error trying to get information to edit the booking: ", err);
    return status(500).json({
      message: "Error trying to get information to edit the booking"
    });
  }
});

// Send the updates after edit
router.put("/:bookingid/edit", async (req, res, next) => {
  const { newcounter, numhikers, comments } = req.body;
  try {
    const bookingToEdit = await Booking.findOne({
      _id: req.params.bookingid,
      user: req.user._id
    });

    // Check if it's possible book or is full
    // const checkAvailability = await Plan.findOne({
    //   _id: planID
    // });

    // const remainingPlaces =
    //   checkAvailability.maxBookings - checkAvailability.counterBooking;
    // if (numhikers > remainingPlaces) {
    //   console.log(`This plan is full`);
    //   return res.status(400).json({
    //     remainingPlaces: remainingPlaces
    //   });
    // }

    if (String(bookingToEdit.user) === String(req.user._id)) {
      const bookingUpdated = await Booking.findOneAndUpdate(
        {
          _id: req.params.bookingid
        },
        {
          $set: {
            numhikers,
            comments
          }
        }
      );

      // Increase the counter of bookings
      const counterBooking = await Plan.findOneAndUpdate(
        {
          _id: planid
        },
        {
          $set: {
            counterBooking: Number(counter) + Number(numhikers)
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
