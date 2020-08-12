import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card.js";
import {connect} from "react-redux";
import {getLocalOffers} from "../../reducer/state/selector.js";


const ListCards = (props) => {

  const {localOffers, onActiveCard} = props;

  return (
    <div className="cities__places-list places__list tabs__content">

      {localOffers.map((offer, i) => {
        return <Card
          key={`${i}-${offer.id}`}
          offer={offer}
          onActiveCard={onActiveCard}
        />;
      })}

    </div>
  );
};


ListCards.propTypes = {
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
  onActiveCard: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  localOffers: getLocalOffers(state),
});


export {ListCards};
export default connect(mapStateToProps)(ListCards);
