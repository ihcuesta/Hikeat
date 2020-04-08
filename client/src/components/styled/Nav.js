import styled from "styled-components";
import { s } from "../styled/globalStyles";

export const Nav = styled.div`
  background: #fff;
  width: 100%;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  height: 50px;
  padding: 0px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 900;
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const ImRestaurant = styled.div`
  margin-right: 5px;
`;

export const WelcomeMsg = styled.p`
  font-size: 14px;
  color: ${s.primary};
  margin-right: 30px;
`;
