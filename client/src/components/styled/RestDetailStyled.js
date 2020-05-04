import styled from "styled-components";
import { s } from "../styled/globalStyles";

export const Rates = styled.div`
  max-width: 280px;
  margin: -30px auto 20px auto;
  display: flex;
  flex-flow: row wrap;
  align-items: top;
  justify-content: space-between;
  && p {
    color: ${s.textSecondary};
  }
`;

export const ContImgResp = styled.div`
  display: none;

  @media (min-width: 700px) {
    display: block;
  }
`;

export const Head = styled.div`
  margin-top: 80px;
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
  /* @media (min-width: 600px) {
    margin-top: 80px;
  } */
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
  align-items: center;
`;

export const OwnerTexts = styled.div`
  margin-left: 20px;

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
  margin-bottom: 10px;
  padding: 5px 10px;
  border: 1px solid #eee;
  border-radius: 5px;
`;

export const RateOp = styled.div`
  margin-left: 20px;
  && p {
  }
`;

export const RatesOp = styled.div`
  max-width: 270px;
  margin-top: -22px;
  margin-left: -18px;
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

export const TitComment = styled.h3`
  font-size: 20px;
  margin-bottom: 0px;
  color: ${s.dark};
  margin-top: 50px;
`;

export const ContRating = styled.div`
  width: 200;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ContBtnComment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row wrap;
  justify-content: flex-end;
  margin-top: -10px;
`;

export const MapContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;
