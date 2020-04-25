import axios from "axios";

const geocodingService = axios.create({
  baseURL: "http://localhost:4000/geocode",
  withCredentials: true
});

export const getLatLong = async endpoint => {
  const data = await geocodingService.get(`/${endpoint}`);
  return data;
};
