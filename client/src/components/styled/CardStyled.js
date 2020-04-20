import styled from "styled-components";
import { s } from "../styled/globalStyles";
import { Link } from "react-router-dom";

export const LocationCont = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  && p {
    color: ${s.textSecondary};
    font-size: 14px;
  }
`;

export const RestCont = styled(Link)`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-top: -15px;
  text-decoration: none;
  && p {
    margin-left: 5px;
    color: ${s.primary};
    font-size: 15px;
    font-weight: 600;
  }
`;

export const BodyCard = styled.p`
  color: ${s.textSecondary};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.35rem;
  margin-top: 20px;
`;
