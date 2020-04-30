import styled from "styled-components";
import heroImg from "../../images/hero-img2.jpg";
import divider from "../../images/gray-divider.png";
import { s } from "../styled/globalStyles";

export const Hero = styled.div`
  @media (min-width: 960px) {
    margin: 50px auto;
    width: 100%;
    background-image: url(${heroImg});
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

export const ContHead = styled.div`
  width: 100%;
  padding: 5%;
  box-sizing: border-box;
  margin-top: 70px;

  @media (min-width: 760px) {
    margin-top: 0px;
  }

  @media (min-width: 960px) {
    max-width: 400px;
    padding: 70px 0px;
    margin: auto;
  }
`;

export const Divider = styled.div`
  width: 100%;
  background-image: url(${divider});
  background-position: top right;
  background-size: cover;
  background-repeat: no-repeat;
  height: 70px;
  margin-top: 50px;

  @media (min-width: 600px) {
    height: 150px;
  }
`;

export const SearcherCont = styled.div`
  max-width: 500px;
  margin: auto;
  padding-bottom: 10px;
`;

export const BgHome = styled.div`
  background-color: ${s.light};
  padding-bottom: 50px;
`;

export const NotFound = styled.div`
  width: 100%;
  && img {
    width: 50px;
    height: auto;
    display: block;
    margin: auto;
  }

  && p {
    text-align: center;
  }
`;
