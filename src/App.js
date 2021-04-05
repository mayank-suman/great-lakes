import React from "react";
import Button from "@material-ui/core/Button";
import Venue from "./venue";

class App extends React.Component {
  componentWillMount() {}

  render() {
    const { name } = this.props;
    return (
      <>
        <h1>Hello {name}</h1>
        <div id="map"></div>
        <Button variant="contained">this is a material UI button</Button>
        <Venue />
      </>
    );
  }
}

export default App;
