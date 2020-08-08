import React from "react";
import renderer from "react-test-renderer";
import {PrivateRoute} from "./private-route.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Router} from "react-router-dom";
import FavouritePage from "../favourite-page/favourite-page.jsx";
import history from "../../history.js";


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
                path={`/favourite`}
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
