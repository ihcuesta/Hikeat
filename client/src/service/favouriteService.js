import axios from "axios";

const favouriteService = axios.create({
  baseURL: `${process.env.REACT_APP_URL_BACK}/favourite`,
  withCredentials: true
});

export const newFavourite = async planid => {
  try {
    const { data } = await favouriteService.post(`/new/${planid}`, {});
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteFavourite = async id => {
  try {
    const { data } = await favouriteService.post(`/delete/${id}`, {});
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllFavourites = async () => {
  try {
    const { data } = await favouriteService.get(`/all`, {});
    return data.getFav;
  } catch (error) {
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
