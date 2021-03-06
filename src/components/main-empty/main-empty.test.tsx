import * as React from "react";
import * as renderer from "react-test-renderer";
import MainEmpty from "./main-empty";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";


const mockStore = configureStore([]);

describe(`Snapshot of MainEmpty`, () => {
  it(`Should render correctly`, () => {
    const store = mockStore({
      city: `Amsterdam`,
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
