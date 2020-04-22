const express = require("express");
const router = express.Router();
const Plan = require("../models/Plan");
const Restaurant = require("../models/Restaurant");
const _ = require("lodash");
const passport = require("passport");

// Last plans restaurant detail page
router.get("/lastplansrest/:id", async (req, res, next) => {
  try {
    const plans = await Plan.find({
      restaurant: req.params.id
    });
    return res.status(200).json({ plans });
  } catch (err) {
    console.log("Error while retrieving plans", error);
    return res.status(500).json({ message: "Impossible to get the plans" });
  }
});

// All by user
router.get("/all", async (req, res, next) => {
  try {
    const plans = await Plan.find({
      owner: req.user._id
    }).populate("restaurant");
    return res.status(200).json({ plans });
  } catch (err) {
    console.log("Error while retrieving plans", error);
    return res.status(500).json({ message: "Impossible to get the plans" });
  }
});

// Total
router.get("/pages/total", async (req, res, next) => {
  try {
    const plans = await Plan.find({});
    const total = plans.length;
    return res.status(200).json({ total });
  } catch (err) {
    console.log("Error while retrieving plans", error);
    return res.status(500).json({ message: "Impossible to get the plans" });
  }
});

// Total per region
router.get("/pages/total/:region", async (req, res, next) => {
  const region = req.params.region;
  try {
    const plans = await Plan.find({
      region: req.params.region
    });
    const total = plans.length;
    return res.status(200).json({ total });
  } catch (err) {
    console.log("Error while retrieving plans", error);
    return res.status(500).json({ message: "Impossible to get the plans" });
  }
});

// Per page
router.get("/pages/:num", async (req, res, next) => {
  const skip = (Number(req.params.num) - 1) * 6;
  try {
    const plans = await Plan.find({}, {}, { limit: 6, skip: skip }).populate(
      "restaurant"
    );
    return res.status(200).json({ plans });
  } catch (err) {
    console.log("Error while retrieving plans", error);
    return res.status(500).json({ message: "Impossible to get the plans" });
  }
});

// Per region and page
router.get("/pages/:region/:num", async (req, res, next) => {
  const skip = (Number(req.params.num) - 1) * 6;
  try {
    const plans = await Plan.find(
      {
        region: req.params.region
      },
      {},
      { limit: 6, skip: skip }
    ).populate("restaurant");
    return res.status(200).json({ plans });
  } catch (err) {
    console.log("Error while retrieving plans", error);
    return res.status(500).json({ message: "Impossible to get the plans" });
  }
});

// Region
router.get("/pages/region/:region", async (req, res, next) => {
  try {
    const plansRegion = await Plan.find({
      region: req.params.region
    });
    console.log(plansRegion);
    return res.status(200).json({ plansRegion });
  } catch (err) {
    console.log("Error while retrieving plans region: ", err);
    return res.status(500).json({ message: "Impossible to get the plans" });
  }
});

// New plan
router.post("/new", async (req, res, next) => {
  const {
    name,
    hikelevel,
    shortDescr,
    longDescr,
    highlights,
    kms,
    image1,
    image2,
    image3,
    image4,
    image5,
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

    const restOwner = await Restaurant.findOne({ owner: req.user._id });

    const newPlan = await Plan.create({
      name,
      owner: req.user._id,
      restaurant: restOwner._id,
      region: restOwner.region,
      city: restOwner.city,
      hikelevel,
      shortDescr,
      longDescr,
      highlights,
      kms,
      image1,
      image2,
      image3,
      image4,
      image5,
      date,
      startTime,
      lunchTime,
      brunch,
      maxBookings,
      counterBookings: 0,
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
    console.log("Error while trying to create a new plan", err);
    return res
      .status(500)
      .json({ message: "Error while trying to create a new plan", err });
  }
});

// Check it its manager of the plan
router.get("/manager/:id", async (req, res, next) => {
  try {
    const checkIfManager = await Plan.find({
      _id: req.params.id,
      owner: req.user._id
    });
    if (checkIfManager.length === 0) {
      return res.status(200).json({ isManager: false });
    } else {
      return res.status(200).json({ isManager: true });
    }
  } catch (error) {
    console.log("Error while trying to find out if its manager: ", error);
    return res
      .status(500)
      .json({ message: "Error while trying to find out if its manager" });
  }
});

// Detail page of plan
router.get("/:id", async (req, res, next) => {
  try {
    const planId = await Plan.findOne({
      _id: req.params.id
    })
      .populate("restaurant")
      .populate("owner");

    return res.status(200).json({ planId });
  } catch (err) {
    console.log("Error while retrieving plan ID: ", err);
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
    highlights,
    kms,
    image1,
    image2,
    image3,
    image4,
    image5,
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
            highlights,
            kms,
            image1,
            image2,
            image3,
            image4,
            image5,
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
    return res.status(500).json({
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
