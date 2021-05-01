import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import "./styles.css";
import "./styles.scss";

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);

if (module.hot) {
  module.hot.accept("./components/App.jsx", function () {
    ReactDOM.render(<App />, mountNode);
  });
}
