import axios from "axios";

const cloudiService = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true
});

export const uploadPhoto = async image => {
  const res = await cloudiService.post("/upload", image);
  return res;
};
