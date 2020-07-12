import React from "react";
import renderer from "react-test-renderer";
import {Login} from "./login.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space.js";


const mockStore = configureStore([]);

describe(`Snapshot of Login`, () => {
  it(`Should render without email - Sign in`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
      },
      [NameSpace.DATA]: {
      },
      [NameSpace.USER]: {
        authInfo: {
          email: null,
        },
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Login/>
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render with email`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
      },
      [NameSpace.DATA]: {
      },
      [NameSpace.USER]: {
        authInfo: {
          email: `email`,
        },
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <Login/>
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
