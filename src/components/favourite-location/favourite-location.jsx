import React from "react";
import PropTypes from "prop-types";
import FavouriteLocationItem from "../favourite-location-item/favourite-location-item.jsx";


const FavouriteLocation = (props) => {
  const {city, localOffers} = props;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {localOffers.map((it) => {
          return (
            <FavouriteLocationItem
              {...it}
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
