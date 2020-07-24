import React from "react";
import renderer from "react-test-renderer";
import ListCities from "./list-cities.jsx";
import {BrowserRouter} from "react-router-dom";


const props = {
  currentCity: `Amsterdam`,
  onCityClick: ()=>{},
};

describe(`Snapshot of ListCities`, () => {
  it(`ListCities should render correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <ListCities
              {...props}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
