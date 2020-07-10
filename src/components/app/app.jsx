import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";


class App extends PureComponent {

  _renderMainPage() {
    const {
      city,
      offers,
      showedOffer,
      onCityClick,
      onCardTitleClick,
    } = this.props;
    const showOffers = offers.find((it) => it.city === city);

    if (showedOffer) {
      return (
        <OfferPage
          offer={showedOffer}
          offers={showOffers}
          onCardTitleClick={onCardTitleClick}
        />);
    } else {
      return (
        <Main
          city={city}
          offers={showOffers}
          onCardTitleClick={onCardTitleClick}
          onCityClick={onCityClick}
        />);
    }
  }

  render() {
    const {city, offers, onCardTitleClick, showedOffer} = this.props;
    const showOffers = offers.find((it) => it.city === city);


    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainPage()}
          </Route>
          <Route exact path="/offer">
            <OfferPage
              offer={showedOffer}
              offers={showOffers}
              onCardTitleClick={onCardTitleClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
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
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
