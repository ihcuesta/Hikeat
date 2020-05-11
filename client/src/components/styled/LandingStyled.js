import styled from "styled-components";
import divider from "../../images/gray-divider.png";
import { s } from "../styled/globalStyles";

export const HeroLanding = styled.div`
  margin: 100px auto;
  max-width: 1600px;
`;

export const TitleLanding = styled.h1`
  font-size: 40px;
  font-weight: 400;
  color: ${s.dark};
`;

export const DishCont = styled.div`
  display: none;

  @media (min-width: 960px) {
    display: block;
    max-width: 800px;
    margin-top: -120px;
    position: relative;
  }

  @media (min-width: 1200px) {
    margin-top: -200px;
  }
`;

export const ContInfoDish = styled.div`
  max-width: 440px;
  padding: 0px 20px;
  margin: auto;
`;

export const GapGray = styled.div`
  display: none;

  @media (min-width: 1300px) {
    display: block;
    width: 100%;
    height: 80px;
    background-color: #eee;
    margin-bottom: 0px;
  }
`;
