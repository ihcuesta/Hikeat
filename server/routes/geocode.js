const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const axios = require("axios");

// Get address
// Get coordinates from API
const getCoord = axios.create({
  baseURL: `https://geocoder.ls.hereapi.com/6.2`,
  withCredentials: true
});

router.get("/:id", async (req, res, next) => {
  try {
    const rest = await Restaurant.findOne({
      _id: req.params.id
    });

    const address = `${rest.address}, ${rest.city}, ${rest.region}, España`;
    const coord = await getCoord.get(
      `/geocode.json?apiKey=JotaIHZpSGZozaImBctqhVeWLp4wl8J38_v118mQQI8&searchtext=${address}`
    );
    console.log(coord.data.Response.View[0].Result[0].Location.DisplayPosition);
    return res
      .status(200)
      .json(coord.data.Response.View[0].Result[0].Location.DisplayPosition);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
