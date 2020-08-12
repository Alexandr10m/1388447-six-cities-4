import * as React from "react";
import Main from "../main/main";
import OfferPage from "../offer-page/offer-page";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getFavourite, getLoadOffersProgress, getErrorOfNetwork} from "../../reducer/data/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import SignInPage from "../sign-in/sign-in";
import FavouritePage from "../favourite-page/favourite-page";
import PrivateRoute from "../private-route/private-route";
import {AppRoute} from "../../constants";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as DataOperation} from "../../reducer/data/data";
import history from "../../history";
import Preload from "../preload/preload";
import withSignIn from "../../hoc/with-sign-in/with-sign-in";
import NetworkError from "../network-error/network-error";
import {CityOffers} from "../../types";


interface Props {
  favourite: CityOffers[];
authorizationStatus: string;
checkAuth: () => void;
loadOffers: () => void;
isLoadOffes: boolean;
isErrorOfNetwork: boolean;
}

const SignIn = withSignIn(SignInPage);

class App extends React.PureComponent<Props> {
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
