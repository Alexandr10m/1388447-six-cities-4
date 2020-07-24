import React from "react";
import PropTypes from "prop-types";
import FavouriteLocation from "../favourite-location/favourite-location.jsx";


const FavouriteOffers = (props) => {
  const {favouriteOffers} = props;
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {favouriteOffers.map((it, i) => {
          const {city, localOffers} = it;
          return (
            <FavouriteLocation
              key={`${city}-${i}`}
              city={city}
              localOffers={localOffers}
            />
          );
        })}
      </ul>
    </section>
  );
};


FavouriteOffers.propTypes = {
  favouriteOffers: PropTypes.array.isRequired,
};


export default FavouriteOffers;

