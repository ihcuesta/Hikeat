import axios from "axios";

const geocodingService = axios.create({
  baseURL: `${process.env.REACT_APP_URL_BACK}/geocode`,
  withCredentials: true
});

export const getLatLong = async endpoint => {
  const data = await geocodingService.get(`/${endpoint}`);
  return data;
};
