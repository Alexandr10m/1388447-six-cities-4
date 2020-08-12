import * as React from "react";
import * as renderer from "react-test-renderer";
import {SignIn} from "./sign-in";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {BrowserRouter} from "react-router-dom";
import {noop} from "../../utils";


const mockStore = configureStore([]);

describe(`Snapshot of SignIn`, () => {
  it(`Should render correctly`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authInfo: {
          email: `iii`
        },
      },
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <SignIn
              city={`Ocean`}
              onLogin={noop}
              login={<input/>}
              password={<input/>}
              loginError={<div/>}
              passwordError={<div/>}
              disableButton={false}
              onSubmit={noop}
            />
          </BrowserRouter>
        </Provider>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
