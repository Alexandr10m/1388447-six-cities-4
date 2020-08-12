import * as React from "react";
import {shallow} from "enzyme";
import {Login} from "./login.js";


describe(`E2E test of Login`, () => {
  it(`click on logo should call function one time`, () => {
    const onCityClick = jest.fn();
    const loginComponent = shallow(
        <Login
          onCityClick={onCityClick}
        />
    );

    const card = loginComponent.find(`.header__logo-link`);
    card.simulate(`click`);

    expect(onCityClick.mock.calls.length).toBe(1);
  });
});
