import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import {Login} from "./login";


configure({adapter: new Adapter()});

describe(`E2E test of Login`, () => {
  it(`click on logo should call function one time`, () => {
    const onCityClick = jest.fn();
    const loginComponent = shallow(
        <Login
          onCityClick={onCityClick}
          email={`email`}
        />
    );

    const card = loginComponent.find(`.header__logo-link`);
    card.simulate(`click`);

    expect(onCityClick.mock.calls.length).toBe(1);
  });
});
