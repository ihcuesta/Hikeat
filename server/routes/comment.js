const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Comment = require("../models/Comment");
const _ = require("lodash");
const passport = require("passport");

// New comment
router.post("/:rest/new", async (req, res, next) => {
  const { stars, comment, date } = req.body;
  try {
    // Check if the restaurant already exists
    const registeredComment = await Comment.findOne({
      user: req.user._id,
      restaurant: req.params.rest
    });
    if (registeredComment) {
      console.log(`You have already starred this restaurant`);
      return res.status(200).json({ isComment: true });
    }

    const newComment = await Comment.create({
      user: req.user._id,
      restaurant: req.params.rest,
      stars,
      comment,
      date
    });
    console.log("Comment created");
    return res.status(200).json({ isComment: false });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Impossible to create new comment" });
  }
});

// Get comments of a restaurant
router.get("/:id", async (req, res, next) => {
  try {
    const comments = await Comment.find({
      restaurant: req.params.id
    }).populate("user");
    return res.status(200).json({ comments });
  } catch (error) {
    console.log("Error while retrieving restaurant ID: ", error);
    return res
      .status(500)
      .json({ message: "Impossible to get the restaurant" });
  }
});

// Get comment of logged user
router.get("/usercomment/:id", async (req, res, next) => {
  try {
    const comments = await Comment.find({
      restaurant: req.params.id,
      user: req.user._id
    });
    return res.status(200).json({ comments });
  } catch (error) {
    console.log("Error while retrieving restaurant ID: ", error);
    return res.status(500).json({ message: "Impossible to get the comment" });
  }
});

// Edit comment of logged user
router.put("/usercomment/:rest/edit", async (req, res, next) => {
  const { stars, comment, date } = req.body;
  try {
    const commentUpdated = await Comment.findOneAndUpdate(
      {
        restaurant: req.params.rest,
        user: req.user._id
      },
      {
        $set: {
          stars,
          comment,
          date
        }
      }
    );
    return res.status(200).json({ commentUpdated });
  } catch (err) {
    console.log("Error trying to update the comment: ", err);
    return res.status(500).json({
      message: "Error trying to update the comment"
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
router.post("/:rest/delete", async (req, res, next) => {
  try {
    const restaurantDeleted = await Comment.findOneAndRemove({
      restaurant: req.params.rest,
      user: req.user._id
    });
    return res.status(200).json({ restaurantDeleted });
  } catch (err) {
    console.log("Error trying to delete the comment: ", err);
    return status(500).json({
      message: "Error trying to delete the comment"
    });
  }
});

module.exports = router;
