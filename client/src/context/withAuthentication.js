import React, { useState, useEffect } from "react";
import { UserContext, whoami } from "../service/authService";
import { Loading } from "../components/UI/Loading";
import io from "socket.io-client";

// THIS is a HOC
export const withAuthentication = Component => () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Socket.io
    const socket = io(process.env.REACT_APP_URL_BACK);

    // When the app starts this runs only once
    console.log("Welcome to app! 👨🏼‍💻");

    // Try to get the current logged in user from our backend
    whoami()
      .then(user => {
        console.error(`Welcome again user ${user.username}`);
        setUser(user);
      })
      .catch(e => {
        console.error("No user logged in ");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {loading && <Loading />}
      <Component />
    </UserContext.Provider>
  );
};
