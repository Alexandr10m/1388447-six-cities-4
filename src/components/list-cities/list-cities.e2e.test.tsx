import React from "react";
import {mount} from "enzyme";
import ListCities from "./list-cities.js";
import {BrowserRouter} from "react-router-dom";

const mockEvt = {
  target: {
    tagName: `SPAN`,
    textContent: `Paris`,
  }
};

describe(`E2E test of ListCities`, () => {
  it(`City name should pressed one time`, () => {
    const onCityClick = jest.fn();

    const listCitiesComponent = mount(
        <BrowserRouter>
          < ListCities
            cities={[`Amsterdam`, `Paris`]}
            currentCity={`Amsterdam`}
            onCityClick={onCityClick}
          />
        </BrowserRouter>
    );

    const cityList = listCitiesComponent.find(`span`);
    const city = cityList.at(0);
    city.simulate(`click`);

    expect(onCityClick.mock.calls.length).toBe(1);
  });

  it(`City name should pressed one time and return city name`, () => {
    const onCityClick = jest.fn((arg) => arg);

    const listCitiesComponent = mount(
        <BrowserRouter>
          < ListCities
            cities={[`Amsterdam`, `Paris`]}
            currentCity={`Amsterdam`}
            onCityClick={onCityClick}
          />
        </BrowserRouter>
    );

    const cityList = listCitiesComponent.find(`span`);
    const city = cityList.at(0);
    city.simulate(`click`, mockEvt);

    expect(onCityClick.mock.calls.length).toBe(1);
    expect(onCityClick.mock.calls[0][0]).toBe(`Paris`);
  });
});
