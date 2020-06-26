import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";


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
    const {offers, onCardTitleClick} = this.props;
    return (
      <div className="cities__places-list places__list tabs__content">

        {offers.map((offer, i) => {
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
  offers: PropTypes.array.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};


export default ListCards;
