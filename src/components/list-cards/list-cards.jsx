import React from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";
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
  localOffers: PropTypes.array.isRequired,
  onActiveCard: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  localOffers: getLocalOffers(state),
});


export {ListCards};
export default connect(mapStateToProps)(ListCards);
