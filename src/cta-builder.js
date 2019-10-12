import React from "react";
import ReactDOM from "react-dom";
import CtaBuilder from "./containers/CtaBuilder.jsx";
import "./styles/styles.scss";
import '@simonwep/pickr/dist/themes/monolith.min.css';

ReactDOM.render(<CtaBuilder />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}
