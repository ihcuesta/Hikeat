import { createMuiTheme } from "@material-ui/core/styles";
import { s } from "../styled/globalStyles";

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
    light: {
      main: "#EEE"
    },
    dark: {
      main: s.dark
    },
    text: {
      primary: "#00adb5"
    }
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
    fontSize: 16,
    color: s.dark,
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
      fontSize: "1.3rem",
      color: s.dark
    },
    h4: {
      fontSize: "1.15rem"
    },
    body1: {
      fontSize: "1rem"
    },
    p: {
      fontSize: "1rem"
    }
  },
  shape: {
    borderRadius: 5
  },
  spacing: 8
});
