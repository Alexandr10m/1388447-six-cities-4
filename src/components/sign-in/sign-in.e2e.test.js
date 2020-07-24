import React from "react";
import {mount} from "enzyme";
import {SignIn} from "./sign-in.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {BrowserRouter} from "react-router-dom";


const mockStore = configureStore([]);
const mockEvent = {
  preventDefault: ()=>{},
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
    const login = jest.fn();

    const signInComponent = mount(
        <Provider store={store}>
          <BrowserRouter>
            <SignIn
              login={login}
              city={`Paris`}
            />
          </BrowserRouter>
        </Provider>);

    const form = signInComponent.find(`form`);
    form.simulate(`submit`, mockEvent);

    expect(login.mock.calls.length).toBe(1);
  });

  it(`SignIn should return object with properties login, passowrd`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authInfo: {
          email: `iii`
        },
      },
    });

    const login = jest.fn((...arg)=> arg);

    const signInComponent = mount(
        <Provider store={store}>
          <BrowserRouter>
            <SignIn
              login={login}
              city={`Paris`}
            />
          </BrowserRouter>
        </Provider>);

    const form = signInComponent.find(`form`);
    form.simulate(`submit`, mockEvent);

    expect(login.mock.calls[0][0]).toEqual({login: ``, password: ``});
  });
});
