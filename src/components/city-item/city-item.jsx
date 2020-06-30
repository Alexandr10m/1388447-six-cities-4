import React from "react";
import PropTypes from "prop-types";

const CityItem = (props) => {
  const {city, currentCity = `Amsterdam`} = props;
  const activeClass = city === currentCity ? `tabs__item--active` : ``;

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${activeClass}`} href="#">
        <span>{city}</span>
      </a>
    </li>
  );
};

CityItem.propTypes = {
  city: PropTypes.string.isRequired,
  currentCity: PropTypes.string.isRequired,
};
export default CityItem;
