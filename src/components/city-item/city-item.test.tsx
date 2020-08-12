import React from "react";
import renderer from "react-test-renderer";
import CityItem from "./city-item.js";
import {BrowserRouter} from "react-router-dom";


describe(`Snapshot of CityItem`, () => {
  it(`CityItem should render correctly with active-class`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <CityItem
              city={`Paris`}
              currentCity={`Paris`}
              onCityClick={()=>{}}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`CityItem should render correctly without active-class`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <CityItem
              city={`Paris`}
              currentCity={`Amsterdame`}
              onCityClick={()=>{}}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
