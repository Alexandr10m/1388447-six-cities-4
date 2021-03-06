import * as React from "react";
import * as renderer from "react-test-renderer";
import {PrivateRoute} from "./private-route";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Router} from "react-router-dom";
import FavouritePage from "../favourite-page/favourite-page";
import history from "../../history";


const mockStore = configureStore([]);
const favourite = [];

describe(`Snapshot of PrivateRoute`, () => {
  it(`Should render correct SignIn component `, () => {
    const store = mockStore({
      [NameSpace.STATE]: {},
      [NameSpace.DATA]: {
        favourite: [],
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authInfo: {
          email: `iii`
        },
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <Router history={history}>
              <PrivateRoute
                render={()=>(<FavouritePage favouriteOffers={favourite}/>)}
                path={`/favorites`}
                exact={true}
                authorizationStatus={AuthorizationStatus.NO_AUTH}
              />
            </Router>
          </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`Should render correct FavouritePage component `, () => {
    const store = mockStore({
      [NameSpace.STATE]: {},
      [NameSpace.DATA]: {
        favourite: [],
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        authInfo: {
          email: `iii`
        },
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <Router history={history}>
              <PrivateRoute
                render={()=>(<FavouritePage favouriteOffers={favourite}/>)}
                path={`/favourite`}
                exact={true}
                authorizationStatus={AuthorizationStatus.AUTH}
              />
            </Router>
          </Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
