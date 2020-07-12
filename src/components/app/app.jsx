import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/state/state.js";
import {getCity, getShowedOffer} from "../../reducer/state/selector.js";
import {getOffers} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selecors.js";
import {Operation, AuthorizationStatus} from "../../reducer/user/user.js";
import SignIn from "../sign-in/sign-in.jsx";

class App extends PureComponent {

  _renderMainPage() {
    const {
      login,
      authorizationStatus,
      city,
      offers,
      showedOffer,
      onCityClick,
      onCardTitleClick,
    } = this.props;
    const showOffers = offers.find((it) => it.city === city);

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      return (
        <SignIn
          city={city}
          onSubmit={login}
        />
      );
    }
    if (showedOffer) {
      return (
        <OfferPage
          offer={showedOffer}
          offers={showOffers}
          onCardTitleClick={onCardTitleClick}
        />
      );
    }

    return (
      <Main
        city={city}
        offers={showOffers}
        onCardTitleClick={onCardTitleClick}
        onCityClick={onCityClick}
      />);
  }

  render() {
    const {city, offers, onCardTitleClick, showedOffer, login} = this.props;
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
          <Route exact path="/auth">
            <SignIn
              city={city}
              onSubmit={login}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  showedOffer: PropTypes.any,
  onCityClick: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  city: getCity(state),
  offers: getOffers(state),
  showedOffer: getShowedOffer(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(Operation.login(authData));
  },
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
