const express = require("express");
const router = express.Router();
const axios = require("axios");

// routes middlewares
const auth = require("./auth");
router.use("/auth", auth);

const restaurant = require("./restaurant");
router.use("/restaurant", restaurant);

const plan = require("./plan");
router.use("/plan", plan);

const booking = require("./booking");
router.use("/booking", booking);

const favourite = require("./favourite");
router.use("/favourite", favourite);

const comment = require("./comment");
router.use("/comment", comment);

const cloudinary = require("./cloudinary");
router.use("/cloudinary", cloudinary);

const geocode = require("./geocode");
router.use("/geocode", geocode);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// Get regions from API
const getRegions = axios.create({
  baseURL:
    "http://apiv1.geoapi.es/provincias?type=JSON&key=5d1a1f506e0484cc5da9fb7ea6b584d37aadaa04fb1ca1ecaef8e9db065b1b74",
  withCredentials: true
});

router.get("/regions", async (req, res, next) => {
  try {
    const reg = await getRegions.get();
    return res.status(200).json(reg.data.data);
  } catch (err) {
    console.log(err);
  }
});

// Get cities from API
const getCities = axios.create({
  baseURL: "http://apiv1.geoapi.es",
  withCredentials: true
});

router.get("/cities/:region", async (req, res, next) => {
  try {
    const cities = await getCities.get(
      `/municipios?CPRO=${req.params.region}&type=JSON&key=5d1a1f506e0484cc5da9fb7ea6b584d37aadaa04fb1ca1ecaef8e9db065b1b74`
    );
    return res.status(200).json(cities.data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
