const express = require("express");
const router = express.Router();
const User = require("../models/User");
const _ = require("lodash");
const passport = require("passport");
const { hashPassword } = require("../lib/hashing");

// SIGNUP
router.post("/signup", async (req, res, next) => {
    const { username, password, description, role } = req.body;
  
    // Create the user
    try {
      // Check if the user already exists
      const registeredUser = await User.findOne({ username });
      if (registeredUser) {
        console.log(`User ${username} already exists`);
        return res.status(400).json({ message: 'Username already taken' });
      }
  
      const newUser = await User.create({
        username,
        password: hashPassword(password),
        description,
        role
      });
  
      // login after signup
      req.login(newUser, error => {
        if (!error) {
          console.log('Created user and logged', newUser);
          return res.status(201).json({
            message: 'User registered successfully',
            user: newUser
          });
        } else {
          console.log(`Something went wrong while login: ${error}`);
          return res.status(500).json({
            message: 'Login after signup failed'
          });
        }
      });
    } catch (error) {
      
        console.log('Error occurred during signup', error);
        return res.status(500).json({
          message: 'Signup failed'
        });
      }
  });

  // LOGIN
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, failureDetails) => {
      if (err) {
        console.log(err);
        return res.json({ status: 500, message: 'Authentication error' });
      }
  
      if (!user) {
        return res.json({ status: 401, message: failureDetails.message });
      }
  
      req.login(user, err => {
        if (err) {
          return res.status(500).json({ message: 'Session save went bad.' });
        }
  
        return res.json({ status: 200, message: 'Logged in successfully', user });
      });
    })(req, res, next);
  });

  // LOGGEDIN
router.get('/loggedin', (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log(req.user.username, ' is logged');
      return res.status(200).json({ user: req.user });
    }
  
    return res.status(403).json({ message: 'Unauthorized to do that' });
  });

  // LOGOUT
router.post('/logout', (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log(`${req.user.username} just logged out`);
      req.logout();
      return res.status(200).json({ message: 'Log out successfully' });
    }
  
    return res.json({ message: 'Cannot logout if not authenticated' });
  });


module.exports = router;