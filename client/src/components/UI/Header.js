import React from "react";
import { Link } from "react-router-dom";
import { useUser, useUserLogout } from "../../service/authService";
import {
  Nav,
  NavRight,
  NavLeft,
  ImRestaurant,
  WelcomeMsg
} from "../styled/Nav";
import { Button, Box, Avatar } from "@material-ui/core";
import { s } from "../styled/globalStyles";

export const Header = () => {
  const session = useUser();
  const handleLogout = useUserLogout();

  return (
    <header>
      <Box mt={5} style={{ boxShadow: s.shadow.s3 }}>
        <Nav>
          <NavLeft>
            <Button component={Link} color="primary" to="/">
              Home
            </Button>
            <Button component={Link} pr={10} color="primary" to="/signup">
              About
            </Button>
            <Button component={Link} pr={10} color="primary" to="/signup">
              Contact
            </Button>
          </NavLeft>
          <NavRight>
            {!session && (
              <>
                <ImRestaurant>
                  <Button
                    component={Link}
                    size="small"
                    pr={10}
                    variant="contained"
                    color={"primary"}
                    to="/login"
                  >
                    I'm a restaurant
                  </Button>
                </ImRestaurant>
                <Button component={Link} mr={10} color="primary" to="/login">
                  Log in
                </Button>
                <Button component={Link} mr={10} color="primary" to="/signup">
                  Sign up
                </Button>
              </>
            )}
            {session && (
              <>
                <Avatar
                  alt={session.user.username}
                  src={session.user.image}
                  style={{
                    backgroundColor: s.primary,
                    color: "#FFF",
                    marginRight: 7,
                    width: 25,
                    height: 25
                  }}
                >
                  {/* {session.user.username[0]} */}
                </Avatar>
                {session.user.role === "Hiker" && (
                  <WelcomeMsg>
                    {session.user.username}, such a great hiker!{" "}
                  </WelcomeMsg>
                )}
                {session.user.role === "Restaurant Owner" && (
                  <>
                    <WelcomeMsg>
                      {session.user.username}, let's cook a plan!{" "}
                    </WelcomeMsg>
                    <Button
                      style={{ marginRight: 15 }}
                      component={Link}
                      size="small"
                      pr={10}
                      variant="contained"
                      color={"secondary"}
                      to="/plan/new"
                    >
                      Create Plan
                    </Button>
                  </>
                )}

                <Button component={Link} color="primary" to="#">
                  Admin
                </Button>
                <Button
                  component={Link}
                  color="primary"
                  onClick={() => handleLogout()}
                >
                  Log out
                </Button>
              </>
            )}
          </NavRight>
        </Nav>
      </Box>
    </header>
  );
};
