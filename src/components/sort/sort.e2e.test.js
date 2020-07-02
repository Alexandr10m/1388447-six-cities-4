import React from "react";
import {mount} from "enzyme";
import {Sort} from "./sort.jsx";


describe(`E2E of Sort`, () => {
  it(`Element li of Sort should pressed one time`, () => {
    const onSelectClick = jest.fn();
    const sortComponent = mount(
        < Sort
          sortType={`Popular`}
          onSelectClick={onSelectClick}
        />
    );

    const options = sortComponent.find(`li.places__option`);
    options.at(1).simulate(`click`);

    expect(onSelectClick.mock.calls.length).toBe(1);
  });

  it(`Calback onSelectClick should return name of sor option`, () => {
    const onSelectClick = jest.fn((arg)=> arg);
    const sortComponent = mount(
        < Sort
          sortType={`Popular`}
          onSelectClick={onSelectClick}
        />
    );

    const options = sortComponent.find(`li.places__option`);
    options.at(1).simulate(`click`);

    expect(onSelectClick.mock.calls.length).toBe(1);
    expect(onSelectClick.mock.calls[0][0]).toBe(`Price: low to high`);
  });
});
