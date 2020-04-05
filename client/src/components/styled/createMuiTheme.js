import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00adb5",
      contrastText: "#FFF"
    },
    secondary: {
      main: "#E33E7F",
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
    fontSize: 16
  },
  shape: {
    borderRadius: 5
  }
});
