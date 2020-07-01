import React from "react";
import renderer from "react-test-renderer";
import CityItem from "./city-item.jsx";

describe(`Snapshot of CityItem`, () => {
  it(`CityItem should render correctly with active-class`, () => {
    const tree = renderer
      .create(
          <CityItem
            city={`Amsterdame`}
            currentCity={`Amsterdame`}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`CityItem should render correctly without active-class`, () => {
    const tree = renderer
      .create(
          <CityItem
            city={`Paris`}
            currentCity={`Amsterdame`}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
