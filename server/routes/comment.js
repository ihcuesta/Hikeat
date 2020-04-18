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

// Detail page of restaurant
// router.get("/:id", async (req, res, next) => {
//   try {
//     const restaurantId = await Restaurant.findOne({
//       _id: req.params.id
//     }).populate("owner");
//     return res.status(200).json({ restaurantId });
//   } catch (error) {
//     console.log("Error while retrieving restaurant ID: ", error);
//     return res
//       .status(500)
//       .json({ message: "Impossible to get the restaurant" });
//   }
// });

// // Edit page for a celebrity ID
// router.get("/:id/edit", async (req, res, next) => {
//   try {
//     const restaurantToEdit = await Restaurant.findOne({
//       _id: req.params.id
//     });

//     if (String(restaurantToEdit.owner) === String(req.user._id)) {
//       console.log(
//         "Acceso permitido" + restaurantToEdit.owner + "  " + req.user._id
//       );
//       return res.status(200).json({ restaurantToEdit });
//     } else {
//       console.log("Only the owner is allowed to edit this restaurant");
//       return res.status(403).json({ message: "Forbidden access" });
//     }
//   } catch (err) {
//     console.log(
//       "Error trying to get information to edit the restaurant: ",
//       err
//     );
//     return status(500).json({
//       message: "Error trying to get information to edit the restaurant"
//     });
//   }
// });

// // Send the updates after edit
// router.put("/:id/edit", async (req, res, next) => {
//   const {
//     name,
//     kind,
//     phone,
//     website,
//     email,
//     region,
//     image1,
//     image2,
//     image3,
//     image4,
//     image5,
//     city,
//     address,
//     pics,
//     allergenCard,
//     dogs,
//     terrace,
//     kids
//   } = req.body;
//   try {
//     const planToEdit = await Plan.findOne({
//       _id: req.params.id
//     });

//     if (String(planToEdit.owner) === String(req.user._id)) {
//       const restaurantUpdated = await Restaurant.findOneAndUpdate(
//         {
//           _id: req.params.id
//         },
//         {
//           $set: {
//             name,
//             kind,
//             phone,
//             website,
//             email,
//             image1,
//             image2,
//             image3,
//             image4,
//             image5,
//             region,
//             city,
//             address,
//             pics,
//             allergenCard,
//             dogs,
//             terrace,
//             kids
//           }
//         }
//       );
//       return res.status(200).json({ restaurantUpdated });
//     } else {
//       console.log("Only the owner is allowed to edit this restaurant");
//       return res.status(403).json({ message: "Forbidden access" });
//     }
//   } catch (err) {
//     console.log("Error trying to update the restaurant details: ", err);
//     return status(500).json({
//       message: "Error trying to update the restaurant details"
//     });
//   }
// });

// // Send delete action
// router.post("/:id/delete", async (req, res, next) => {
//   try {
//     let restaurantCheck = await Plan.findOne({
//       _id: req.params.id
//     });

//     if (String(restaurantCheck.owner) === String(req.user._id)) {
//       const restaurantDeleted = await Restaurant.findOneAndRemove({
//         _id: req.params.id
//       });
//       return res.status(200).json({ restaurantDeleted });
//     } else {
//       console.log("Only the owner is allowed to delete this restaurant");
//       return res.status(403).json({ message: "Forbidden access" });
//     }
//   } catch (err) {
//     console.log("Error trying to delete the restaurant: ", err);
//     return status(500).json({
//       message: "Error trying to delete the restaurant"
//     });
//   }
// });

module.exports = router;
