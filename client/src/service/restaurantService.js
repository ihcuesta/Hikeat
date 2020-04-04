import axios from "axios";

const restaurantService = axios.create({
  baseURL: "http://localhost:4000/restaurant",
  withCredentials: true
});

export const newRestaurant = async ({
  name,
  kind,
  phone,
  website,
  email,
  location,
  pics,
  allergenCard,
  dogs,
  terrace,
  kidsMenu
}) => {
  try {
    const { data } = await restaurantService.post("/new", {
      name,
      kind,
      phone,
      website,
      email,
      location,
      pics,
      allergenCard,
      dogs,
      terrace,
      kidsMenu
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const fetchSingleRestaurant = async endpoint => {
  const { data } = await restaurantService.get(`/${endpoint}`);
  return data;
};

export const fetchEditRestaurant = async endpoint => {
  const { data } = await restaurantService.get(`/${endpoint}/edit`);
  return data;
};

export const editRestaurant = async (
  endpoint,
  {
    name,
    kind,
    phone,
    website,
    email,
    location,
    pics,
    allergenCard,
    dogs,
    terrace,
    kidsMenu
  }
) => {
  try {
    const { data } = await restaurantService.put(`/${endpoint}/edit`, {
      name,
      kind,
      phone,
      website,
      email,
      location,
      pics,
      allergenCard,
      dogs,
      terrace,
      kidsMenu
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteRestaurant = async endpoint => {
  const { data } = await restaurantService.post(`/${endpoint}/delete`);
  return data;
};
