import styled from "styled-components";
import placeholder from "../../images/placeholder.jpg";

export const s = {
  primary: "#00adb5",
  secondary: "#ff5722",
  textSecondary: "#888",
  light: "#EEE",
  dark: "#303841",
  error: "#f44336",
  shadow: {
    s3: "0px 3px 1px -2px rgba(0, 0, 0, 0.2)"
  }
};

export const changeFormat = price => {
  price = String(price);
  if (price.includes(".")) {
    price = price.split(".");
    price[1] = price[1].padEnd(2, "0");
    price = price.join(",");
  } else {
    price = price + ",00";
  }
  return price;
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

export const fabStyle = {
  style: {
    width: 40,
    height: 40
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
  max-width: 1400px;
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

export const EditCont = styled.div`
  width: 100%;
  padding: 25px 5%;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #eee;
  margin-bottom: 10px;
`;
