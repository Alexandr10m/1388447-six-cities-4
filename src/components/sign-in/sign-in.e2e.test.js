import React from "react";
import {shallow} from "enzyme";
import SignIn from "./sign-in.jsx";


describe(`E2E of SingIn`, () => {

  it(`SignIn should pressed on button one time`, () => {
    const onSubmit = jest.fn();

    const signInComponent = shallow(
        <SignIn
          onSubmit={onSubmit}
          city={`Paris`}
        />);

    const formSendPrevention = jest.fn();

    window.HTMLInputElement.value = `some`;
    const {loginRef, passwordRef} = signInComponent.instance();
    jest.spyOn(loginRef.current, `value`);
    jest.spyOn(passwordRef.current, `value`);

    signInComponent.find(`form`).simulate(`click`);

    expect(onSubmit.mock.calls.length).toBe(1);
    expect(formSendPrevention.mock.calls.length).toBe(1);
  });
});
