import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";
import {connect} from "react-redux";
import {sortByType} from "../../utils.js";


class ListCards extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null,
    };
    this._hanlerCardMouseEnter = this._hanlerCardMouseEnter.bind(this);
  }

  _hanlerCardMouseEnter(offer) {
    this.setState({activeCard: offer});
  }

  render() {
    const {localOffers, onCardTitleClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">

        {localOffers.map((offer, i) => {
          return <Card
            key={`${i}-${offer.title}`}
            offer={offer}
            onCardTitleClick={onCardTitleClick}
            onActiveCard={this._hanlerCardMouseEnter}
          />;
        })}

      </div>
    );
  }
}


ListCards.propTypes = {
  localOffers: PropTypes.array.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  localOffers: sortByType(state.sortType, state.offers.localOffers),
});


export {ListCards};
export default connect(mapStateToProps)(ListCards);
