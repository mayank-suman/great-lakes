import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// TODO: change theme color
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00bbec",
    },
    secondary: {
      main: "#54DEFD",
    },
    background: {
      default: "#effbff",
    },
    text: {
      primary: "#555",
    },
  },
});

export default theme;
