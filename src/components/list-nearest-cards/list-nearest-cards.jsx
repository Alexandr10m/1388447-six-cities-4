import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import CardNearest from "../card-nearest/card-nearest.jsx";


class ListNearestCards extends PureComponent {
  render() {
    const {offers} = this.props;

    return (
      <div className="near-places__list places__list">
        {offers.map((offer, i) => {
          return (
            <CardNearest
              key={`${i}-${offer.title}`}
              offer={offer}

            />);
        })}
      </div>
    );
  }
}


ListNearestCards.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    isPremium: PropTypes.bool.isRequired,
    pictures: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    grade: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    bedroom: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    facilities: PropTypes.array.isRequired,
    reviews: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
  })),
};


export default ListNearestCards;
