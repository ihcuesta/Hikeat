import styled from "styled-components";
import heroImg from "../../images/hero-img2.jpg";
import divider from "../../images/gray-divider.png";

export const Hero = styled.div`
  width: 100%;
  background-image: url(${heroImg});
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ContHead = styled.div`
  max-width: 400px;
  padding: 70px 0px;
  margin: auto;
`;

export const Divider = styled.div`
  width: 100%;
  background-image: url(${divider});
  background-position: top right;
  background-size: cover;
  background-repeat: no-repeat;
  height: 195px;
`;

export const SearcherCont = styled.div`
  max-width: 500px;
  margin: auto;
`;
