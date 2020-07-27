import React, {PureComponent} from "react";
import Main from "../main/main.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFavourite, getLoadOffersProgress} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import SignIn from "../sign-in/sign-in.jsx";
import FavouritePage from "../favourite-page/favourite-page.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import {AppRoute} from "../../constants.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";


class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {checkAuth, loadOffers} = this.props;

    checkAuth();
    loadOffers();
  }

  showPreload() {
    return (<div>... in progress</div>);
  }

  showApp() {
    const {favourite, authorizationStatus} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          {authorizationStatus === AuthorizationStatus.AUTH && (
            <Redirect exact from={AppRoute.LOGIN} to={`/`}/>
          )}
          <Route exact path={AppRoute.LOGIN} component={SignIn}/>
          <PrivateRoute exact path={AppRoute.FAVOURITE}
            render={() => (<FavouritePage favouriteOffers={favourite}/>)}
          />
          <Redirect exact from={`/`} to={AppRoute.DEFAULT_CITY}/>
          <Route exact path={AppRoute.CITY} component={Main}/>
          <Route exact path={AppRoute.OFFER} component={OfferPage}/>
        </Switch>
      </BrowserRouter>
    );
  }

  render() {
    const {isLoadOffes} = this.props;
    if (isLoadOffes) {
      return this.showPreload();
    }
    return this.showApp();
  }
}

App.propTypes = {
  favourite: PropTypes.array.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  checkAuth: PropTypes.func.isRequired,
  loadOffers: PropTypes.func.isRequired,
  isLoadOffes: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  favourite: getFavourite(state),
  isLoadOffes: getLoadOffersProgress(state),
});

const mapDispatchToProps = (dispatch) => ({
  checkAuth() {
    dispatch(UserOperation.checkAuth());
  },
  loadOffers() {
    dispatch(DataOperation.loadOffers());
  },
});


export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
