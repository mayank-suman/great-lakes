import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// TODO: change theme color
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#cfe8fc",
    },
  },
});

export default theme;
