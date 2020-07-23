import React from "react";
import PropTypes from "prop-types";
import CityItem from "../city-item/city-item.jsx";
import {CITIES} from "../../constants.js";


const ListCities = (props) => {
  const {currentCity, onCityClick} = props;

  const handlerCityClick = (evt) => {

    if (evt.target.tagName !== `SPAN`) {
      return;
    }
    const city = evt.target.textContent;
    onCityClick(city);
  };

  return (
    <ul onClick={handlerCityClick}
      className="locations__list tabs__list">
      {CITIES.map((city, i) => <CityItem key={`${city}-${i}`} city={city} currentCity={currentCity}/>)}
    </ul>
  );
};


ListCities.propTypes = {
  currentCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export default ListCities;
