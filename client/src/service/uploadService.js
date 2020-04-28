import axios from "axios";

const cloudiService = axios.create({
  baseURL: `${process.env.REACT_APP_URL_BACK}/cloudinary`,
  withCredentials: true
});

export const uploadPhoto = async image => {
  const res = await cloudiService.post("/upload", image);
  return res;
};

export const deletePhoto = async public_id => {
  const res = await cloudiService.post("/delete", public_id);
  return res;
};
