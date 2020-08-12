import * as React from "react";
import * as renderer from "react-test-renderer";
import {Login} from "./login";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {BrowserRouter} from "react-router-dom";
import {noop} from "../../utils";


const mockStore = configureStore([]);

describe(`Snapshot of Login`, () => {
  it(`Should render without email - Sign in`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authInfo: {
          email: undefined,
        },
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <Login
                onCityClick={noop}
                email={undefined}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render with email`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authInfo: {
          email: `email`,
        },
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <Login
                onCityClick={noop}
                email={`email`}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
