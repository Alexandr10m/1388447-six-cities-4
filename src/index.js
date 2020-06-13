import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const offersNames = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`, `Wood and stone place`,
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`
];

const SETTINGS = {
  offersCount: offersNames.length,
  grade: 80,
  selected: `popular`,
  offersNames,
};

ReactDOM.render(
    <App {...SETTINGS} />,
    document.querySelector(`#root`)
);
