import * as React from "react";
import PropTypes from "prop-types";
import CityItem from "../city-item/city-item.js";


const ListCities = (props) => {
  const {cities, currentCity, onCityClick} = props;

  const handlerCityClick = (evt) => {

    const city = evt.target.textContent;
    onCityClick(city);
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city, i) => <CityItem
        key={`${city}-${i}`}
        city={city}
        currentCity={currentCity}
        onCityClick={handlerCityClick}
      />)}
    </ul>
  );
};


ListCities.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export default ListCities;
