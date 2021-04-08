import React from "react";
// import Button from "@material-ui/core/Button";
// import Venue from "./Venue.jsx";
import Lakes from "./lakes";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class App extends React.Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Container maxWidth="sm">
          <Typography
            component="div"
            style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
          >
            {/* <Button variant="contained">this is a material UI button</Button> */}
            {/* <Venue /> */}
            <Lakes />
          </Typography>
        </Container>
      </>
    );
  }
}

export default App;
