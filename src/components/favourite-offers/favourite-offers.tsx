import React from "react";
import PropTypes from "prop-types";
import FavouriteLocation from "../favourite-location/favourite-location.js";


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
  favouriteOffers: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string.isRequired,
    cityCoords: PropTypes.arrayOf(PropTypes.number),
    cityZoom: PropTypes.number,
    localOffers: PropTypes.arrayOf(PropTypes.shape({
      isPremium: PropTypes.bool.isRequired,
      pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.number.isRequired,
      isFavourite: PropTypes.bool.isRequired,
      grade: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      bedroom: PropTypes.number.isRequired,
      maxAdults: PropTypes.number.isRequired,
      facilities: PropTypes.arrayOf(PropTypes.string).isRequired,
      coords: PropTypes.arrayOf(PropTypes.number).isRequired,
      locationZoom: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      host: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        isPro: PropTypes.bool.isRequired,
        avatarUrl: PropTypes.string.isRequired,
      }).isRequired,
    })),
  }))
};


export default FavouriteOffers;

