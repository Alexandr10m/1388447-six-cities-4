import React from "react";
import PropTypes from "prop-types";
import FavouriteLocationItem from "../favourite-location-item/favourite-location-item.jsx";
import {Link} from "react-router-dom";


const FavouriteLocation = (props) => {
  const {city, localOffers} = props;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            to={`/${city}`}
            className="locations__item-link">
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {localOffers.map((it) => {
          return (
            <FavouriteLocationItem
              offer={it}
              key={it.id}
            />
          );
        })}
      </div>
    </li>
  );
};


FavouriteLocation.propTypes = {
  city: PropTypes.string.isRequired,
  localOffers: PropTypes.array.isRequired,
};


export default FavouriteLocation;
