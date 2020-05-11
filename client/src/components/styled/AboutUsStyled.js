import styled from "styled-components";
import { s } from "../styled/globalStyles";

export const HeroAboutUs = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

export const ImgBg = styled.div`
  @keyframes mountains {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }

  width: 100%;
  position: absolute;
  height: 400px;
  overflow: hidden;

  && img {
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0px;
    animation: mountains 30s infinite;
  }
`;

export const WeAre = styled.h2`
  color: ${s.dark};
  top: 140px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 40px;
  font-weight: 400;
  position: absolute;
  z-index: 800;
  text-align: center;
  right: 50%;
  width: 400px;
  margin-right: -200px;
`;

export const Erasable = styled.span`
  color: ${s.primary};
  font-weight: bold;
`;
