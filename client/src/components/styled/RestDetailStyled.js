import styled from "styled-components";
import { s } from "../styled/globalStyles";

export const Rates = styled.div`
  max-width: 270px;
  margin: -30px auto 20px auto;
  display: flex;
  flex-flow: row wrap;
  align-items: top;
  justify-content: space-between;
  && p {
    color: ${s.textSecondary};
  }
`;

export const Head = styled.div`
  margin-top: 100px;
  text-align: center;
  margin-bottom: -20px;
  && p {
    font-size: 14px;
    color: ${s.textSecondary};
  }

  && h1 {
    font-size: 30px;
    margin-top: -10px;
    color: ${s.dark};
  }
`;

export const ImgCont = styled.div`
  width: 100%;
  padding: 7px;
  border-radius: 5px;
  background-color: ${s.light};
  margin-bottom: 20px;
`;

export const Contact = styled.div`
  width: 100%;
  padding: 5%;
  box-sizing: border-box;
  background-color: ${s.primary};
  color: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const Owner = styled.div`
  display: flex;
  flex-flow: row wrap;

  && img {
    margin-right: 20px;
  }
`;

export const OwnerTexts = styled.div`
  margin-top: 5px;

  && p:first-child {
    font-size: 14px;
  }

  && p:nth-child(2) {
    font-weight: 600;
    font-size: 18px;
    margin-top: -10px;
  }
`;

export const InfoBullets = styled.div`
  margin: 10px 0px;
`;

export const Opinion = styled.div`
  padding: 5%;
  box-sizing: border-box;
`;

export const RateOp = styled.div`
  && p {
  }
`;

export const RatesOp = styled.div`
  max-width: 270px;
  margin-top: -22px;
  margin-left: -16px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  && p {
    color: ${s.textSecondary};
    font-size: 14px;
  }
`;

export const OpText = styled.div`
  margin-top: -5px;
`;

export const IconsCont = styled.div`
  padding: 5%;
  box-sizing: border-box;
`;

export const InfoIcon = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  && p {
    padding-left: 10px;
  }
`;
