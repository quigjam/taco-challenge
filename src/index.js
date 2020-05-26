import React from "react";
import ReactDOM from "react-dom";
//global stylesheet
import "./index.css";
import App from "./App.jsx";

//render application

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
