const express = require('express');
const router  = express.Router();

// routes middlewares
const auth = require('./auth');
router.use('/auth', auth);

const restaurant = require('./restaurant');
router.use('/restaurant', restaurant);

const plan = require('./plan');
router.use('/plan', plan);

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
