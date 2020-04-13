import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true
});

export const regions = async () => {
  try {
    const data = await apiService.get("/regions");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const cities = async () => {
  try {
    const data = await apiService.get("/cities/:regions");
    return data;
  } catch (err) {
    console.log(err);
  }
};
