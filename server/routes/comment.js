const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
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

    const findRest = await Restaurant.findOne({
      _id: req.params.rest
    });

    const newTotalComments = Number(findRest.totalComments) + 1;
    const newTotalRate = Number(findRest.totalRate) + stars;
    const newAv = Math.floor(newTotalRate / newTotalComments);

    const updateRest = await Restaurant.findOneAndUpdate(
      {
        _id: req.params.rest
      },
      {
        $set: {
          totalComments: newTotalComments,
          totalRate: newTotalRate,
          rateAv: newAv
        }
      }
    );

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
    if (req.isAuthenticated()) {
      const comments = await Comment.find({
        restaurant: req.params.id,
        user: req.user._id
      });

      return res.status(200).json({ comments });
    } else {
      const comments = [];
      return res.status(200).json({ comments });
    }
  } catch (error) {
    console.log("Error while retrieving restaurant ID: ", error);
    return res.status(500).json({ message: "Impossible to get the comment" });
  }
});

// Edit comment of logged user
router.put("/usercomment/:rest/edit", async (req, res, next) => {
  const { comment, date } = req.body;
  try {
    const commentUpdated = await Comment.findOneAndUpdate(
      {
        restaurant: req.params.rest,
        user: req.user._id
      },
      {
        $set: {
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

// Send delete action
router.post("/usercomment/:rest/delete", async (req, res, next) => {
  try {
    const commentSearched = await Comment.findOne({
      restaurant: req.params.rest,
      user: req.user._id
    });

    const stars = commentSearched.stars;

    const restSearched = await Restaurant.findOne({
      _id: req.params.rest
    });

    let totalRate = restSearched.totalRate - stars;

    let totalComments = restSearched.totalComments - 1;
    console.log("The totalComments are " + totalComments);
    let newAv;
    totalComments === 0 ? (newAv = 0) : (newAv = totalRate / totalComments);

    console.log("The newAv is " + newAv);

    const restUpdated = await Restaurant.findOneAndUpdate(
      {
        _id: req.params.rest
      },
      {
        $set: {
          totalRate: totalRate,
          totalComments: totalComments,
          rateAv: Number(newAv)
        }
      }
    );

    const commentDeleted = await Comment.findOneAndRemove({
      restaurant: req.params.rest,
      user: req.user._id
    });

    return res.status(200).json({ commentDeleted });
  } catch (err) {
    console.log("Error trying to delete the comment: ", err);
    return res.status(500).json({
      message: "Error trying to delete the comment"
    });
  }
});

module.exports = router;
