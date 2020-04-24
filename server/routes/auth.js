const express = require("express");
const router = express.Router();
const User = require("../models/User");
const _ = require("lodash");
const passport = require("passport");
const { hashPassword } = require("../lib/hashing");

// SIGNUP
router.post("/signup", async (req, res, next) => {
  const { username, password, description, role, fav, image } = req.body;

  // Create the user
  try {
    // Check if the user already exists
    const registeredUser = await User.findOne({ username });
    if (registeredUser) {
      console.log(`User ${username} already exists`);
      return res.status(400).json({ message: "Username already taken" });
    }

    const newUser = await User.create({
      username,
      password: hashPassword(password),
      description,
      role,
      fav,
      image
    });

    // login after signup
    req.login(newUser, error => {
      if (!error) {
        console.log("Created user and logged", newUser);
        return res.status(201).json({
          message: "User registered successfully",
          user: newUser
        });
      } else {
        console.log(`Something went wrong while login: ${error}`);
        return res.status(500).json({
          message: "Login after signup failed"
        });
      }
    });
  } catch (error) {
    console.log("Error occurred during signup", error);
    return res.status(500).json({
      message: "Signup failed"
    });
  }
});

// LOGIN
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Authentication error" });
    }

    if (!user) {
      return res.status(401).json({ message: "Authentication error" });
    }

    req.login(user, err => {
      if (err) {
        return res.status(500).json({ message: "Authentication error" });
      }

      return res.status(200).json({ message: "Logged in successfully", user });
    });
  })(req, res, next);
});

// WHO AM I
router.get("/whoami", (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.user.username, " is logged");
    return res.status(200).json({ user: req.user });
  }
  console.log("Unauthorized to do that");
  return res.status(403).json({ message: "Unauthorized to do that" });
});

// LOGOUT
router.post("/logout", (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(`${req.user.username} just logged out`);
    req.logout();
    return res.status(200).json({ message: "Log out successfully" });
  }

  return res.json({ message: "Cannot logout if not authenticated" });
});

// Edit user
router.get("/profile/edit", async (req, res, next) => {
  try {
    const userToEdit = await User.findOne({
      _id: req.user._id
    });

    if (String(userToEdit._id) === String(req.user._id)) {
      console.log("Acceso permitido" + userToEdit.user + "  " + req.user._id);
      return res.status(200).json({ userToEdit });
    } else {
      console.log("Only the owner is allowed to edit his user profile");
      return res.status(403).json({ message: "Forbidden access" });
    }
  } catch (err) {
    console.log("Error trying to get information to edit the profile: ", err);
    return res.status(500).json({
      message: "Error trying to get information to edit the profile"
    });
  }
});

// Send updates of user
router.put("/profile/edit", async (req, res, next) => {
  const { image, description, fav } = req.body;
  try {
    const userUpdated = await User.findOneAndUpdate(
      {
        _id: req.user._id
      },
      {
        $set: {
          image,
          description,
          fav
        }
      }
    );

    return res.status(200).json({ userUpdated });
  } catch (err) {
    console.log("Error trying to update the user: ", err);
    return res.status(500).json({
      message: "Error trying to update the user"
    });
  }
});

module.exports = router;
