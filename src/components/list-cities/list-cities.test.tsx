import * as React from "react";
import * as renderer from "react-test-renderer";
import ListCities from "./list-cities";
import {BrowserRouter} from "react-router-dom";
import {noop} from "../../utils";


describe(`Snapshot of ListCities`, () => {
  it(`ListCities should render correctly`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <ListCities
              cities={[`Amsterdam`, `Dusseldorf`, `Hamburg`]}
              currentCity={`Amsterdam`}
              onCityClick={noop}
            />
          </BrowserRouter>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
