import React from "react";
import { Box, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styled from "styled-components";
import { s } from "../styled/globalStyles";
import footerImg from "../../images/footer-img.png";

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

const FooterImg = styled.div`
  width: 100%;
  height: 235px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom right;
  background-image: url(${footerImg});
  color: #fff;
`;

const FooterImgH = styled.div`
  width: 100%;
  height: 235px;
  background-color: #eee;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom right;
  background-image: url(${footerImg});
  color: #fff;
`;

export const Footer = () => {
  return (
    <footer>
      <FooterImg></FooterImg>
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

export const FooterHome = () => {
  return (
    <footer>
      <FooterImgH></FooterImgH>
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

export const FooterAlt = () => {
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
