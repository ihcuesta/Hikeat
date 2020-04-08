import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00adb5",
      contrastText: "#FFF"
    },
    secondary: {
      main: "#ff5722",
      contrastText: "#FFF"
    },
    lightGrey: {
      main: "#EEE"
    },
    darkGrey: {
      main: "#303841"
    },
    text: {
      primary: "#00adb5"
    }
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    fontSize: 16,
    button: {
      fontSize: "1rem",
      textTransform: "none"
    },
    h1: {
      fontSize: "5rem",
      fontWeight: 500
    },
    h2: {
      fontSize: "3rem"
    },
    h3: {
      fontSize: "1.3rem"
    },
    h4: {
      fontSize: "1.15rem"
    },
    body1: {
      fontSize: "1rem"
    }
  },
  shape: {
    borderRadius: 5
  },
  spacing: 1
});
