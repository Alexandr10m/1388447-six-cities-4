import React from "react";
import renderer from "react-test-renderer";
import ListCities from "./list-cities.js";
import {BrowserRouter} from "react-router-dom";


describe(`Snapshot of ListCities`, () => {
  it(`ListCities should render correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <ListCities
              cities={[`Amsterdam`, `Dusseldorf`, `Hamburg`]}
              currentCity={`Amsterdam`}
              onCityClick={()=>{}}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
