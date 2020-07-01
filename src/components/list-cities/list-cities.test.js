import React from "react";
import renderer from "react-test-renderer";
import ListCities from "./list-cities.jsx";


const props = {
  currentCity: `Amsterdam`,
  onCityClick: ()=>{},
};

describe(`Snapshot of ListCities`, () => {
  it(`ListCities should render correctly`, () => {
    const tree = renderer
      .create(
          <ListCities
            {...props}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
