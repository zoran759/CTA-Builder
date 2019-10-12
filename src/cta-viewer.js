import React from "react";
import ReactDOM from "react-dom";
import CtaViewer from "./containers/CtaViewer.jsx";
import "./styles/styles-viewer.scss";

let viewer = document.createElement("div");
viewer.setAttribute("id", "cta-viewer");
document.body.appendChild(viewer);
ReactDOM.render(<CtaViewer />, document.getElementById("cta-viewer"));


if (module.hot) {
  module.hot.accept();
}
