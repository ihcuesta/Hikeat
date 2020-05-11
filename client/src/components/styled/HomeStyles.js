import styled from "styled-components";
import heroImg from "../../images/hero-img2.jpg";
import divider from "../../images/gray-divider.png";
import { s } from "../styled/globalStyles";

export const Hero = styled.div`
  margin: 50px auto;
  max-width: 1600px;

  @media (min-width: 700px) {
    background-image: url("https://res.cloudinary.com/dnmktvry5/image/upload/v1588554734/hikeat/static/home-ipad_cwbw5f.jpg");
    background-size: 350px auto;
    background-position: 110% -50%;
    background-repeat: no-repeat;
  }

  @media (min-width: 960px) {
    background-image: none;
  }
`;

export const SubtitleDesktop = styled.h3`
  display: none;
  color: ${s.dark};
  font-weight: 400;
  font-size: 25px;

  @media (min-width: 500px) {
    display: block;
  }
`;

export const SubtitleMob = styled.h3`
  display: block;
  color: ${s.dark};
  font-weight: 400;
  font-size: 25px;

  @media (min-width: 500px) {
    display: none;
  }
`;

export const PicHome = styled.div`
  display: none;

  @media (min-width: 960px) {
    max-width: 900px;
    height: 620px;
    position: relative;
    overflow: hidden;
    display: block;
  }
`;

export const ContHead = styled.div`
  width: 100%;
  padding: 5%;
  box-sizing: border-box;
  margin-top: 30px;

  @media (min-width: 960px) {
    max-width: 400px;
    padding: 50px 0px 0px;
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
  margin-top: 0px;

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
