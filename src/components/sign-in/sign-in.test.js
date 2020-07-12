import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space.js";


const mockStore = configureStore([]);

const props = {
  city: `Ocean`,
  onSubmit: ()=>{},
};

describe(`Snapshot of SignIn`, () => {
  it(`Should render correctly`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {},
      [NameSpace.DATA]: {},
      [NameSpace.USER]: {
        authInfo: {
          email: `iii`
        },
      },
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <SignIn
            {...props}
          />
        </Provider>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
