import styled from "styled-components";
import { s } from "../styled/globalStyles";

export const NameRest = styled.div`
  font-size: 20px;
  margin-top: -20px;
  margin-bottom: 50px;
  color: ${s.primary};
`;

export const Hike = styled.div`
  background-color: #eee;
  border-radius: 5px;
  padding: 5%;
  margin-bottom: 10px;
`;

export const HikeTitle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  && h3 {
    font-size: 20px;
  }
`;

export const Highlights = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-left: 10px;
  && p {
    margin-left: 10px;
  }
`;

export const Infographic = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin: 10px auto 0px auto;
  && p {
    text-align: center;
  }
`;

export const InfographImg = styled.div`
  width: 95%;
  margin: 0px auto 10px auto;
`;

export const Menu = styled.div`
  background-color: ${s.dark};
  border-radius: 5px;
  padding: 5%;
  margin-bottom: 10px;
`;

export const MenuTitle = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  color: #fff;
  && h3 {
    font-size: 20px;
    margin-bottom: 0px;
  }
  && p {
    margin-bottom: 5px;
    margin-top: 35px;
  }
`;

export const Course = styled.p`
  color: #fff;
  text-align: center;
  margin-top: 2px;
  margin-bottom: 0px;
`;

export const Organizer = styled.p`
  color: ${s.dark};
`;

export const RestContact = styled.p`
  color: #fff;
  margin-top: -15px;
`;

export const DetailsContact = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 95%;
  margin: 15px auto 30px auto;
`;

export const Date = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 50%;
`;

export const Time = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 50%;
`;

export const DateText = styled.div`
  margin-left: 15px;
  && p {
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

export const Location = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
`;

export const TitleBooking = styled.p`
  color: ${s.primary};
  font-weight: bold;
`;

export const Booking = styled.div`
  border: 2px solid ${s.primary};
  border-radius: 5px;
  padding: 5%;
`;

export const BookButton = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
`;

export const TitleRest = styled.h3`
  text-align: center;
  margin: 70px 0px 30px;
`;

export const Legend = styled.div`
  width: "100%";
  color: #fff;
  font-size: 14px;
  font-weight: 200;
  margin: 30px 0px 15px;

  && div {
    display: flex;
    flex-flow: row wrap;
    margin-top: 0px;
    margin-bottom: -20px;
  }
  && img {
    margin-right: 5px;
  }
`;