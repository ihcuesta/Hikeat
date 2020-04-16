import styled from "styled-components";
import placeholder from "../../images/placeholder.jpg";

export const s = {
  primary: "#00adb5",
  secondary: "#ff5722",
  textSecondary: "#888",
  light: "#EEE",
  dark: "#303841",
  shadow: {
    s3: "0px 3px 1px -2px rgba(0, 0, 0, 0.2)"
  }
};

export const GlobalStyles = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700&display=swap");
  font-family: "Montserrat", sans-serif;
  color: ${s.dark};
  font-weight: 400;
`;

export const txtField = {
  style: {
    color: s.dark,
    marginBottom: "7%"
  }
};

export const txtFieldAlt = {
  style: {
    color: s.dark,
    maxLength: 2
  }
};

export const ContAddImg = styled.div`
  margin-bottom: 30px;
`;

export const AddImg = styled.div`
  position: relative;
  && input {
    display: none;
  }

  && img {
    cursor: pointer;
    margin: auto;
    width: 100%;
    height: auto;
  }
`;

export const LabelAddImg = styled.label`
  background-image: url(${placeholder});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ContIcon = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const ContBody = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 0 5%;
`;

export const Error = styled.p`
  color: #f44336;
  font-size: 0.8571428571428571rem;
  margin-left: 14px;
  margin-top: 5px;
`;

export const Gap = styled.div`
  height: 25px;
`;

export const BodyText = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

export const BodyLight = styled.p`
  font-size: 16px;
  font-weight: 300;
`;
