import axios from "axios";

const authService = axios.create({
  baseURL: "http://localhost:4000/auth",
  withCredentials: true
});

export const signup = async ({ username, password, role, description }) => {
  try {
    const { data } = await authService.post("/signup", {
      username,
      password,
      role,
      description
    });
    return data.user;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async ({ username, password }) => {
  const { data } = await authService.post("/login", { username, password });
  return data;
};

export const logout = async () => {
  const response = await authService.post("/logout");
  return response;
};

export const isLoggedIn = async () => {
  const { data } = await authService.get("/loggedin");

  return data;
};
