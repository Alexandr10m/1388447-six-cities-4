import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";


const CityItem = (props) => {
  const {city, currentCity = `Paris`} = props;
  const activeClass = city === currentCity ? `tabs__item--active` : ``;

  return (
    <li className="locations__item">
      <Link
        to={`/${city}`}
        className={`locations__item-link tabs__item ${activeClass}`}>
        <span>{city}</span>
      </Link>
    </li>
  );
};

CityItem.propTypes = {
  city: PropTypes.string.isRequired,
  currentCity: PropTypes.string.isRequired,
};
export default CityItem;
