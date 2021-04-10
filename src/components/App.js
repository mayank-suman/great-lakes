import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "../theme";
import Lakes from "./lakes";
// import Venue from "./Venue.jsx";
class App extends React.Component {
  render() {
    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="sm">
            {/* <Venue /> */}
            <Lakes />
          </Container>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
