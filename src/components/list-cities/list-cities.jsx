import React from "react";
import PropTypes from "prop-types";
import CityItem from "../city-item/city-item.jsx";


const ListCities = (props) => {
  const {cities, currentCity, onCityClick} = props;

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
      {cities.map((city, i) => <CityItem key={`${city}-${i}`} city={city} currentCity={currentCity}/>)}
    </ul>
  );
};


ListCities.propTypes = {
  cities: PropTypes.array.isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export default ListCities;
