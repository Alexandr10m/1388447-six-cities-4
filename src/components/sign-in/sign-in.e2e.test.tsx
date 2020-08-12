import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, mount} from "enzyme";
import {SignIn} from "./sign-in";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space";
import {BrowserRouter} from "react-router-dom";
import {noop} from "../../utils";


configure({adapter: new Adapter()});

const mockStore = configureStore([]);

const mockEvent = {
  preventDefault: noop,
};

describe(`E2E of SingIn`, () => {
  it(`SignIn should call submit one time`, () => {
    const store = mockStore({

      [NameSpace.USER]: {
        authInfo: {
          email: `iii`
        },
      },
    });

    const onLogin = jest.fn();
    const onSubmit = jest.fn((fn)=> fn());

    const signInComponent = mount(
        <Provider store={store}>
          <BrowserRouter>
            <SignIn
              city={`Paris`}
              onLogin={onLogin}
              login={<input/>}
              password={<input/>}
              loginError={<div/>}
              passwordError={<div/>}
              disableButton={false}
              onSubmit={onSubmit}
            />
          </BrowserRouter>
        </Provider>);

    const form = signInComponent.find(`form`);
    form.simulate(`submit`, mockEvent);

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onLogin.mock.calls.length).toBe(1);

  });
});
