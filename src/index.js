import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {createOffers} from "./mocks/offers.js";

const COUNT_OF_OFFERS = 4;
const offers = createOffers(COUNT_OF_OFFERS);

const SETTINGS = {
  selected: `popular`,
  offers
};


ReactDOM.render(
    <App {...SETTINGS} />,
    document.querySelector(`#root`)
);
