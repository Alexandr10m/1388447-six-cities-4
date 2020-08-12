import React from "react";
import renderer from "react-test-renderer";
import {SignIn} from "./sign-in.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space.js";
import {BrowserRouter} from "react-router-dom";


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
              onLogin={()=>{}}
              login={<input/>}
              password={<input/>}
              loginError={<div/>}
              passwordError={<div/>}
              disableButton={false}
              onSubmit={()=>{}}
            />
          </BrowserRouter>
        </Provider>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
