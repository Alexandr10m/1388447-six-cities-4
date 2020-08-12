import * as React from "react";
import PropTypes from "prop-types";
import CardNearest from "../card-nearest/card-nearest.js";


const MAX_COUNT_NEAREST_OFFERS = 3;

const ListNearestCards = (props) => {
  const {offers} = props;

  return (
    <div className="near-places__list places__list">
      {offers.map((offer, i) => {
        if (i > MAX_COUNT_NEAREST_OFFERS) {
          return false;
        }
        return (
          <CardNearest
            key={`${i}-${offer.title}`}
            offer={offer}

          />);
      })}
    </div>
  );
};


ListNearestCards.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
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
};


export default ListNearestCards;
