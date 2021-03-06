import axios from "axios";
import React, { useContext } from "react";

export const UserContext = React.createContext();

export const useUser = () => {
  const userState = useContext(UserContext);
  return userState.user;
};

export const useUserSetter = () => {
  const userState = useContext(UserContext);
  return userState.setUser;
};

export const useUserIsLoading = () => {
  const userState = useContext(UserContext);
  return userState.loading;
};

export const useUserLogout = () => {
  const userState = useContext(UserContext);

  // NOTE: This returned function is "handleLogout"
  return async () => {
    console.log("log out!");
    // Remove user from React User State context
    userState.setUser(null);
    // Remove cookie from backend and frontend
    return doLogout();
  };
};

const authService = axios.create({
  baseURL: `${process.env.REACT_APP_URL_BACK}/auth`,
  withCredentials: true
});

export const doSignup = async ({
  username,
  password,
  role,
  description,
  image,
  fav
}) => {
  try {
    const { data } = await authService.post("/signup", {
      username,
      password,
      role,
      description,
      image,
      fav
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const doLogin = async ({ username, password }) => {
  const { data } = await authService.post("/login", { username, password });
  return data;
};

export const doLogout = async () => {
  const response = await authService.post("/logout");
  return response;
};

export const whoami = async () => {
  const { data } = await authService.get("/whoami");
  return data;
};

export const editUser = async () => {
  const { data } = await authService.get("/profile/edit");
  return data.userToEdit;
};

export const editUserUpdate = async (image, description, fav) => {
  const { data } = await authService.put("/profile/edit", {
    image,
    description,
    fav
  });
  return data;
};
