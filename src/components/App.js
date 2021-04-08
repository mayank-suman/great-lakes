import React from "react";
import Button from "@material-ui/core/Button";
import Places from "./Places.jsx";
// import Venue from "./Venue.jsx";

class App extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>Hello {name}</h1>
        <div id="map"></div>
        <Button variant="contained">this is a material UI button</Button>
        {/* <Venue /> */}
        <Places />
      </>
    );
  }
}

export default App;
