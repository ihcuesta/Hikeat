import styled from "styled-components";

export const s = {
  primary: "#00adb5",
  secondary: "#ff5722",
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
    color: s.dark
  }
};
