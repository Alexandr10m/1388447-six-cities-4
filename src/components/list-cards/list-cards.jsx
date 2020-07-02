import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";
import {connect} from "react-redux";
import {sortByType} from "../../utils.js";
import {ActionCreator} from "../../reducer.js";


class ListCards extends PureComponent {

  render() {
    const {localOffers, onCardTitleClick, onCardMouseEnter} = this.props;


    return (
      <div className="cities__places-list places__list tabs__content">

        {localOffers.map((offer, i) => {
          return <Card
            key={`${i}-${offer.id}`}
            offer={offer}
            onCardTitleClick={onCardTitleClick}
            onActiveCard={onCardMouseEnter}
          />;
        })}

      </div>
    );
  }
}


ListCards.propTypes = {
  localOffers: PropTypes.array.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCardMouseEnter: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  localOffers: sortByType(state.sortType, state.offers.localOffers),
});

const mapDispatchToProps = (dispatch) => ({
  onCardMouseEnter(offer) {
    dispatch(ActionCreator.showPoiner(offer));
  }
});

export {ListCards};
export default connect(mapStateToProps, mapDispatchToProps)(ListCards);
