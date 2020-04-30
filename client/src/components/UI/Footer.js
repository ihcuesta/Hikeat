import React from "react";
import { Box, Button } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styled from "styled-components";
import { s } from "../styled/globalStyles";
import footerImg from "../../images/footer-img.png";

const FooterCont = styled(Box)`
  width: 100%;
  /* height: 50px; */
  /* padding: 30px; */
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${s.primary};
  color: #fff;
`;

const FooterImg = styled.div`
  width: 100%;
  height: 150px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom right;
  background-image: url(${footerImg});
  color: #fff;
  @media (min-width: 780px) {
    height: 235px;
  }
`;

const FooterImgH = styled.div`
  width: 100%;
  height: 150px;
  background-color: #eee;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom right;
  background-image: url(${footerImg});
  color: #fff;
  @media (min-width: 780px) {
    height: 235px;
  }
`;

const FooterDesktop = styled.p`
  display: none;
  @media (min-width: 600px) {
    display: block;
  }
`;

const FooterMobile = styled.p`
  display: block;
  text-align: center;
  line-height: 25px;
  @media (min-width: 600px) {
    display: none;
  }
`;

export const Footer = () => {
  return (
    <footer>
      <FooterImg></FooterImg>
      <FooterCont>
        <FooterDesktop color="primary">
          &copy; Hikeat | Made with{" "}
          <FavoriteIcon style={{ fontSize: "16px" }}></FavoriteIcon> by Iván
          Herranz
        </FooterDesktop>
        <FooterMobile color="primary">
          &copy; Hikeat<br></br>
          Made with <FavoriteIcon
            style={{ fontSize: "16px" }}
          ></FavoriteIcon>{" "}
          by Iván Herranz
        </FooterMobile>
      </FooterCont>
    </footer>
  );
};

export const FooterHome = () => {
  return (
    <footer>
      <FooterImgH></FooterImgH>
      <FooterCont>
        <FooterDesktop color="primary">
          &copy; Hikeat | Made with{" "}
          <FavoriteIcon style={{ fontSize: "16px" }}></FavoriteIcon> by Iván
          Herranz
        </FooterDesktop>
        <FooterMobile color="primary">
          &copy; Hikeat<br></br>
          Made with <FavoriteIcon
            style={{ fontSize: "16px" }}
          ></FavoriteIcon>{" "}
          by Iván Herranz
        </FooterMobile>
      </FooterCont>
    </footer>
  );
};

export const FooterAlt = () => {
  return (
    <footer>
      <FooterCont>
        <FooterDesktop color="primary">
          &copy; Hikeat | Made with{" "}
          <FavoriteIcon style={{ fontSize: "16px" }}></FavoriteIcon> by Iván
          Herranz
        </FooterDesktop>
        <FooterMobile color="primary">
          &copy; Hikeat<br></br>
          Made with <FavoriteIcon
            style={{ fontSize: "16px" }}
          ></FavoriteIcon>{" "}
          by Iván Herranz
        </FooterMobile>
      </FooterCont>
    </footer>
  );
};
