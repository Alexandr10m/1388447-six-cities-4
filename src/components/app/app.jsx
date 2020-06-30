import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";


class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handlerCardTitleClick = this.handlerCardTitleClick.bind(this);
  }

  handlerCardTitleClick() {
    return {};
  }

  _renderMainPage() {
    const {
      city,
      offers,
      showedOffer,
      onCityClick,
      onCardTitleClick,
    } = this.props;

    if (showedOffer) {
      return (
        <OfferPage
          offer={showedOffer}
          offers={offers}
          onCardTitleClick={onCardTitleClick}
        />);
    } else {
      return (
        <Main
          city={city}
          offers={offers}
          onCardTitleClick={onCardTitleClick}
          onCityClick={onCityClick}
        />);
    }
  }

  render() {
    const {offers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainPage()}
          </Route>
          <Route exact path="/offer">
            <OfferPage
              offer={offers.localOffers[0]}
              offers={offers}
              onCardTitleClick={this.handlerCardTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.object.isRequired,
  showedOffer: PropTypes.any,
  onCityClick: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  city: state.city,
  offers: state.offers,
  showedOffer: state.showedOffer,
});

const mapDispatchToProps = (dispatch) => ({
  onCardTitleClick(offer) {
    dispatch(ActionCreator.showOffer(offer));
  },
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.resetShowedOffer());
    dispatch(ActionCreator.changeOffers(city));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
