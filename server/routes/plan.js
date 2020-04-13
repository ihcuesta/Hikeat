const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");
const Restaurant = require("../models/Restaurant");
const _ = require("lodash");
const passport = require("passport");

// New plan
router.post("/new", async (req, res, next) => {
  const {
    name,
    hikelevel,
    shortDescr,
    longDescr,
    kms,
    pics,
    date,
    startTime,
    lunchTime,
    brunch,
    maxBookings,
    bookings,
    breakfast,
    firstCourse,
    secondCourse,
    dessert,
    drinks,
    bread,
    coffee,
    status
  } = req.body;
  try {
    // Check if the plan already exists
    const registeredPlan = await Plan.findOne({ name });
    if (registeredPlan) {
      console.log(`Plan ${name} already exists`);
      return res.status(400).json({ message: "Plan name already taken" });
    }

    const restPlan = await Restaurant.findOne({ owner: req.user._id }).populate(
      "owner"
    );

    const newPlan = await Plan.create({
      name,
      hikelevel,
      shortDescr,
      longDescr,
      kms,
      pics,
      date,
      startTime,
      lunchTime,
      brunch,
      maxBookings,
      bookings,
      breakfast,
      firstCourse,
      secondCourse,
      dessert,
      drinks,
      bread,
      coffee,
      status
    });
    console.log("Plan created");
    return res.status(200).json({ newPlan });
  } catch (err) {
    console.log("Error while trying to create a new plan");
    return res
      .status(500)
      .json({ message: "Error while trying to create a new plan" });
  }
});

// Detail page of plan
router.get("/:id", async (req, res, next) => {
  try {
    const planId = await Plan.findOne({
      _id: req.params.id
    });
    return res.status(200).json({ planId });
  } catch (err) {
    console.log("Error while retrieving plan ID: ", error);
    return res.status(500).json({ message: "Impossible to get the plan" });
  }
});

// Edit page for a plan ID
router.get("/:id/edit", async (req, res, next) => {
  try {
    const planToEdit = await Plan.findOne({
      _id: req.params.id
    });

    if (String(planToEdit.owner) === String(req.user._id)) {
      console.log("Acceso permitido");
      return res.status(200).json({ planToEdit });
    } else {
      console.log("Only the owner is allowed to edit this plan");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log("Error trying to get information to edit the plan: ", err);
    return status(500).json({
      message: "Error trying to get information to edit the plan"
    });
  }
});

// Send the updates after edit
router.put("/:id/edit", async (req, res, next) => {
  const {
    name,
    hikelevel,
    shortDescr,
    longDescr,
    kms,
    pics,
    date,
    startTime,
    lunchTime,
    brunch,
    maxBookings,
    bookings,
    breakfast,
    firstCourse,
    secondCourse,
    dessert,
    drinks,
    bread,
    coffee,
    status
  } = req.body;
  try {
    const planToEdit = await Plan.findOne({
      _id: req.params.id
    });

    if (String(planToEdit.owner) === String(req.user._id)) {
      const registeredPlan = await Plan.findOne({ name });
      if (registeredPlan) {
        console.log(`Plan ${name} already exists`);
        return res.status(400).json({ message: "Plan name already taken" });
      }
      const planUpdated = await Plan.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          $set: {
            name,
            hikelevel,
            shortDescr,
            longDescr,
            kms,
            pics,
            date,
            startTime,
            lunchTime,
            brunch,
            maxBookings,
            bookings,
            breakfast,
            firstCourse,
            secondCourse,
            dessert,
            drinks,
            bread,
            coffee,
            status
          }
        }
      );
      return res.status(200).json({ planUpdated });
    } else {
      console.log("Only the owner is allowed to edit this plan");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log("Error trying to update the plan details: ", err);
    return status(500).json({
      message: "Error trying to update the plan details"
    });
  }
});

// Send delete action
router.post("/:id/delete", async (req, res, next) => {
  try {
    let planCheck = await Plan.findOne({
      _id: req.params.id
    });

    if (String(planCheck.owner) === String(req.user._id)) {
      const planDeleted = await Plan.findOneAndRemove({
        _id: req.params.id
      });
      return res.status(200).json({ planDeleted });
    } else {
      console.log("Only the owner is allowed to delete this plan");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log("Error trying to delete the plan: ", err);
    return status(500).json({
      message: "Error trying to delete the restaurant"
    });
  }
});

module.exports = router;
