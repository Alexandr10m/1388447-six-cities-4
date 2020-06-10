import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const SETTINGS = {
  offersCount: 5,
  grade: 80,
  seleced: `popular`

};

ReactDOM.render(
    <App {...SETTINGS} />,
    document.querySelector(`#root`)
);
