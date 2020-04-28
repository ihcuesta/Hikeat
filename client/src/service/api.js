import axios from "axios";

const apiService = axios.create({
  baseURL: `${process.env.REACT_APP_URL_BACK}`,
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
