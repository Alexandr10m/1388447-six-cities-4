import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getOffers, getFavourite} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import SignIn from "../sign-in/sign-in.jsx";
import FavouritePage from "../favourite-page/favourite-page.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import {getCity} from "../../reducer/state/selector.js";


class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  showPreload() {
    return (<div>... in progress</div>);
  }

  showApp() {
    const {city, favourite, authorizationStatus} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          {authorizationStatus === AuthorizationStatus.AUTH && (
            <Redirect exact from={`/login`} to={`/`}/>
          )}
          <Route exact path={`/login`} component={SignIn}/>
          <PrivateRoute exact path={`/favourite`}
            render={() => (<FavouritePage favouriteOffers={favourite}/>)}
          />
          <Redirect exact from={`/`} to={`/Paris`}/>
          <Route exact path={`/:city`} component={Main}/>
          <Route exact path={`/${city}/:offerId`} component={OfferPage}/>
        </Switch>
      </BrowserRouter>
    );
  }

  render() {
    const {offers} = this.props;
    if (offers.length === 0) {
      return this.showPreload();
    }
    return this.showApp();
  }
}

App.propTypes = {
  city: PropTypes.string.isRequired,
  favourite: PropTypes.array.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
};


const mapStateToProps = (state) => ({
  city: getCity(state),
  offers: getOffers(state),
  authorizationStatus: getAuthorizationStatus(state),
  favourite: getFavourite(state),
});


export {App};
export default connect(mapStateToProps)(App);
