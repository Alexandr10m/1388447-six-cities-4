import React from "react";
import renderer from "react-test-renderer";
import MainEmpty from "./main-empty.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";


const offers = {
  city: `Amsterdam`,
  cityCoords: [52.38333, 4.9],
  localOffers: null,
};
const mockStore = configureStore([]);

describe(`Snapshot of MainEmpty`, () => {
  it(`Should render correctly`, () => {
    const store = mockStore({
      city: `Amsterdam`,
      offers,
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <MainEmpty
              city={`Amsterdam`}
            />
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
