import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import Card from "../card/card.jsx";
import {connect} from "react-redux";
import {getLocalOffers} from "../../reducer/state/selector.js";


class ListCards extends PureComponent {

  render() {
    const {localOffers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">

        {localOffers.map((offer, i) => {
          return <Card
            key={`${i}-${offer.id}`}
            offer={offer}
          />;
        })}

      </div>
    );
  }
}


ListCards.propTypes = {
  localOffers: PropTypes.array.isRequired,
};


const mapStateToProps = (state) => ({
  localOffers: getLocalOffers(state),
});


export {ListCards};
export default connect(mapStateToProps)(ListCards);
