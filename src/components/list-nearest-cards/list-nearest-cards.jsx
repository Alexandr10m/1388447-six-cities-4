import React from "react";
import PropTypes from "prop-types";
import CardNearest from "../card-nearest/card-nearest.jsx";


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
  offers: PropTypes.array.isRequired,
};


export default ListNearestCards;
