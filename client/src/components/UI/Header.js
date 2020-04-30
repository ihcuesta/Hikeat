import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link, Redirect } from "react-router-dom";
import { useUser, useUserLogout, whoami } from "../../service/authService";
import { searchRestaurant } from "../../service/restaurantService";
import {
  Nav,
  NavRight,
  NavLeft,
  ImRestaurant,
  WelcomeMsg,
  LogoLeft
} from "../styled/Nav";
import {
  Button,
  Box,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
import { s } from "../styled/globalStyles";
import {
  DesktopHeader,
  MobileHeader,
  AvatarUser
} from "../styled/HeaderStyles";
import MenuIcon from "@material-ui/icons/Menu";

export const Header = () => {
  const session = useUser();
  const handleLogout = useUserLogout();
  const [isRest, setIsRest] = useState(false);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  // useEffect(() => {
  //   checkIfRestaurant();
  // }, []);

  const checkIfRestaurant = async () => {
    const user = await whoami();
    const isRestaurant = await searchRestaurant(user.user.id);
    if (isRestaurant.data) {
      history.push("/plan/new");
    } else {
      history.push("/restaurant/new");
    }
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const adminMob = session => {
    if (session.user.role === "Hiker") {
      history.push("/hiker/admin");
    } else {
      history.push("/owner/admin");
    }
    setAnchorEl(null);
  };

  return (
    <header>
      <DesktopHeader>
        <Box mt={5} style={{ boxShadow: s.shadow.s3 }}>
          <Nav>
            <NavLeft>
              <Button component={Link} color="primary" to="/">
                <LogoLeft>
                  Hik<span style={{ color: s.primary }}>eat</span>
                  {/* <img
                    width="100"
                    height="auto"
                    src="https://res.cloudinary.com/dnmktvry5/image/upload/v1588172715/hikeat/static/Hikeat_fbv3u3.svg"
                  /> */}
                </LogoLeft>
              </Button>
              {/* <Button component={Link} pr={10} color="primary" to="/signup">
              About
            </Button>
            <Button component={Link} pr={10} color="primary" to="/signup">
              Contact
            </Button> */}
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
                      to="/signup"
                    >
                      I'm restaurant owner
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
                        onClick={checkIfRestaurant}
                        variant="contained"
                        color="secondary"
                        // to={isRest ? "/plan/new" : "restaurant/new"}
                      >
                        Create Plan
                      </Button>
                    </>
                  )}

                  <Button
                    onClick={
                      session.user.role === "Hiker"
                        ? () => history.push("/hiker/admin")
                        : () => history.push("/owner/admin")
                    }
                    color="primary"
                    to="#"
                  >
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
      </DesktopHeader>
      <MobileHeader>
        <AppBar position="fixed">
          <Toolbar
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "space-between"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexFlow: "row wrap"
              }}
            >
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Link to="/" style={{ color: "#FFF", textDecoration: "none" }}>
                <h3>Hikeat</h3>
              </Link>
            </div>
            {session ? (
              <div>
                <AvatarUser>
                  <Avatar
                    alt={session.user.username}
                    src={session.user.image}
                    onClick={handleMenu}
                    style={{
                      backgroundColor: s.primary,
                      color: "#FFF",
                      marginRight: 7,
                      width: 25,
                      height: 25
                    }}
                  ></Avatar>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => adminMob(session)}>Admin</MenuItem>
                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                  </Menu>
                </AvatarUser>
              </div>
            ) : (
              <h3
                style={{ fontWeight: 400, cursor: "pointer" }}
                onClick={() => history.push("/login")}
              >
                Login
              </h3>
            )}
          </Toolbar>
        </AppBar>
      </MobileHeader>
    </header>
  );
};
