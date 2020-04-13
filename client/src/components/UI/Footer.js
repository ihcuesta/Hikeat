import React from "react";
import { Box, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styled from "styled-components";
import { s } from "../styled/globalStyles";

const FooterCont = styled(Box)`
  width: 100%;
  height: 50px;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${s.primary};
  color: #fff;
`;

export const Footer = () => {
  return (
    <footer>
      <FooterCont>
        <p color="primary">
          &copy; Hikeat | Made with{" "}
          <FavoriteIcon style={{ fontSize: "16px" }}></FavoriteIcon> by Iván
          Herranz
        </p>
      </FooterCont>
    </footer>
  );
};
