import * as React from "react";
import * as renderer from "react-test-renderer";
import CityItem from "./city-item";
import {BrowserRouter} from "react-router-dom";
import {noop} from "../../utils";


describe(`Snapshot of CityItem`, () => {
  it(`CityItem should render correctly with active-class`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <CityItem
              city={`Paris`}
              currentCity={`Paris`}
              onCityClick={noop}
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
              onCityClick={noop}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
