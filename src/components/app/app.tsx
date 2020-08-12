import * as React from "react";
import Main from "../main/main.jsx";
import OfferPage from "../offer-page/offer-page.jsx";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getFavourite, getLoadOffersProgress, getErrorOfNetwork} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import SignInPage from "../sign-in/sign-in.jsx";
import FavouritePage from "../favourite-page/favourite-page.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import {AppRoute} from "../../constants.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import history from "../../history.js";
import Preload from "../preload/preload.jsx";
import withSignIn from "../../hoc/with-sign-in/with-sign-in.js";
import NetworkError from "../network-error/network-error.jsx";


const SignIn = withSignIn(SignInPage);

class App extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {checkAuth, loadOffers} = this.props;

    checkAuth();
    loadOffers();
  }

  showPreload() {
    return <Preload/>;
  }

  showApp() {
    const {favourite, authorizationStatus} = this.props;

    return (
      <Router history={history}>
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
      </Router>
    );
  }

  render() {
    const {isLoadOffes, isErrorOfNetwork} = this.props;

    if (isErrorOfNetwork) {
      return <NetworkError/>;
    }
    if (isLoadOffes) {
      return this.showPreload();
    }
    return this.showApp();
  }
}

App.propTypes = {
  favourite: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.string.isRequired,
    cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
    cityZoom: PropTypes.number.isRequired,
    localOffers: PropTypes.arrayOf(PropTypes.shape({
      isPremium: PropTypes.bool.isRequired,
      pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.number.isRequired,
      isFavourite: PropTypes.bool.isRequired,
      grade: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      bedroom: PropTypes.number.isRequired,
      maxAdults: PropTypes.number.isRequired,
      facilities: PropTypes.arrayOf(PropTypes.string).isRequired,
      coords: PropTypes.arrayOf(PropTypes.number).isRequired,
      locationZoom: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      host: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        isPro: PropTypes.bool.isRequired,
        avatarUrl: PropTypes.string.isRequired,
      }).isRequired,
    })),
  })).isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  checkAuth: PropTypes.func.isRequired,
  loadOffers: PropTypes.func.isRequired,
  isLoadOffes: PropTypes.bool.isRequired,
  isErrorOfNetwork: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  favourite: getFavourite(state),
  isLoadOffes: getLoadOffersProgress(state),
  isErrorOfNetwork: getErrorOfNetwork(state),
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
