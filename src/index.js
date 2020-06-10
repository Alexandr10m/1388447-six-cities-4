import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  OFFERS_COUNT: 5,
  grade: 80,
  seleced: `popular`

};

ReactDOM.render(
    <App mainOptions={Settings} />,
    document.querySelector(`#root`)
);
