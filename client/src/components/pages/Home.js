import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField
} from "@material-ui/core";
import { HomeHead } from "../UI/HomeHead";
import { Searcher } from "../UI/Searcher";
import { Divider } from "../styled/HomeStyles";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

import { s } from "../styled/globalStyles";

export const Home = () => {
  return (
    <>
      <HomeHead></HomeHead>
      <Divider></Divider>
      {/* <Searcher></Searcher> */}
    </>
  );
};
