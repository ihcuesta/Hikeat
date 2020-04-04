import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import { logout } from "../../service/authService";

const Home = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <>
      <p>ESTA ES LA HOME</p>
      {user ? <p>user.username</p> : <p>No hay usuario logueado</p>}
      {user ? <p>user.role</p> : <p>Imposible acceder al rol</p>}
      {user && (
        <Link to="/" onClick={handleLogout()}>
          LOG OUT
        </Link>
      )}
    </>
  );
};

export default Home;
