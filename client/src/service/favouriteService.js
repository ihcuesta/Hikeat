import axios from "axios";

const favouriteService = axios.create({
  baseURL: "http://localhost:4000/favourite",
  withCredentials: true
});

export const newFavourite = async id => {
  try {
    const { data } = await favouriteService.post(`${id}/new`, {});
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteFavourite = async id => {
  try {
    const { data } = await favouriteService.post(`${id}/delete`, {});
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getFavourite = async id => {
  try {
    const { data } = await favouriteService.get(`/${id}`, {});
    console.log(data);
    return data.getFav;
  } catch (error) {
    console.log(error);
    return error;
  }
};
