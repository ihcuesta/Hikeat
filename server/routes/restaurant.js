const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Plan = require("../models/Plan");
const _ = require("lodash");
const passport = require("passport");
const { hashPassword } = require("../lib/hashing");

// Check if user has got restaurant created
router.get("/searchrest/:id", async (req, res, next) => {
  try {
    const checkUser = await Restaurant.find({
      owner: req.params.id
    });
    if (checkUser.length > 0) {
      return res.status(200).json(true);
    } else {
      return res.status(200).json(false);
    }
  } catch (err) {
    console.log("Imposible saber si hay restaurante creado", err);
  }
});

// New restaurant
router.post("/new", async (req, res, next) => {
  const {
    name,
    kind,
    descr,
    phone,
    website,
    email,
    region,
    city,
    image1,
    image2,
    image3,
    image4,
    image5,
    address,
    pics,
    allergenCard,
    dogs,
    terrace,
    kids
  } = req.body;
  try {
    // Check if the restaurant already exists
    const registeredRestaurant = await Restaurant.findOne({ name });
    if (registeredRestaurant) {
      console.log(`Restaurant ${name} already exists`);
      return res.status(400).json({ message: "Restaurant already taken" });
    }

    const newRestaurant = await Restaurant.create({
      name,
      owner: req.user._id,
      kind,
      descr,
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
      opinions: [],
      allergenCard,
      dogs,
      terrace,
      kids,
      rateAv: 0,
      totalRate: 0,
      totalComments: 0
    });
    console.log("Restaurant created");
    return res.status(200).json({ newRestaurant });
  } catch (err) {}
});

// Check it its manager of the restaurant
router.get("/manager/:id", async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const checkIfManager = await Restaurant.find({
        _id: req.params.id,
        owner: req.user._id
      });
      if (checkIfManager.length === 0) {
        return res.status(200).json({ isManager: false });
      } else {
        return res.status(200).json({ isManager: true });
      }
    } else {
      return res.status(200).json({ isManager: false });
    }
  } catch (error) {
    console.log("Error while trying to find out if its manager: ", error);
    return res
      .status(500)
      .json({ message: "Error while trying to find out if its manager" });
  }
});

// Detail page of restaurant
router.get("/:id", async (req, res, next) => {
  try {
    const restaurantId = await Restaurant.findOne({
      _id: req.params.id
    }).populate("owner");

    const commentsRes = await Comment.find({
      restaurant: req.params.id
    }).populate("user");

    return res.status(200).json({ restaurantId, commentsRes });
  } catch (error) {
    console.log("Error while retrieving restaurant ID: ", error);
    return res
      .status(500)
      .json({ message: "Impossible to get the restaurant" });
  }
});

// Restaurant Card for Admin Owner
router.get("/restcard/admin", async (req, res, next) => {
  try {
    const rest = await Restaurant.find({
      owner: req.user._id
    });

    const commentsRes = await Comment.find({
      restaurant: rest._id
    }).populate("user");

    if (rest.length > 0 && commentsRes > 0) {
      return res.status(200).json({ rest, commentsRes });
    } else if (rest.length > 0) {
      return res.status(200).json({ rest, commentsRes: [] });
    } else {
      return res.status(200).json({ rest: [], commentsRes: [] });
    }
  } catch (error) {
    console.log("Error while retrieving restaurant ID: ", error);
    return res
      .status(500)
      .json({ message: "Impossible to get the restaurant" });
  }
});

// Edit page for a restaurant ID
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
    descr,
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
    allergenCard,
    dogs,
    terrace,
    kids
  } = req.body;
  try {
    const restaurantToEdit = await Restaurant.findOne({
      _id: req.params.id
    });

    if (String(restaurantToEdit.owner) === String(req.user._id)) {
      const restaurantUpdated = await Restaurant.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          $set: {
            name,
            kind,
            descr,
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
    return res.status(500).json({
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
