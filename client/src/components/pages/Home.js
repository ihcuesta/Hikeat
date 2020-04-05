import React from "react";
import { Link } from "react-router-dom";
import {
  useUserSetter,
  useUser,
  useUserLogout
} from "../../service/authService";

export const Home = () => {
  const user = useUser();
  console.log(user);
  const setUser = useUserSetter();
  const logout = useUserLogout();
  return (
    <>
      <p>ESTA ES LA HOME</p>
      {user ? <p>{user.username}</p> : <p>No hay usuario logueado</p>}
      {user ? <p>{user.role}</p> : <p>Imposible acceder al rol</p>}
      {(user && (
        <Link to="/" onClick={() => logout()}>
          LOG OUT
        </Link>
      )) || (
        <div>
          <Link to="/login">LOGIN</Link>
          <br />
          <Link to="/signup">SIGNUP</Link>
        </div>
      )}
    </>
  );
};
