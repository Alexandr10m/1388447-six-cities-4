import React from "react";
import PropTypes from "prop-types";
import CityItem from "../city-item/city-item.jsx";
import {CITIES} from "../../constants.js";


const ListCities = (props) => {
  const {currentCity} = props;

  return (
    <ul
      className="locations__list tabs__list">
      {CITIES.map((city, i) => <CityItem key={`${city}-${i}`} city={city} currentCity={currentCity}/>)}
    </ul>
  );
};


ListCities.propTypes = {
  currentCity: PropTypes.string.isRequired,
};

export default ListCities;
