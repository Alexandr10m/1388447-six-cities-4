import * as React from "react";
import * as renderer from "react-test-renderer";
import {NetworkError} from "./network-error";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";


const mockStore = configureStore([]);

describe(`Snapshot of NetworkError`, () => {
  it(`NetworkError should render correct`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {},
      [NameSpace.DATA]: {
        textError: `some error`,
      },
      [NameSpace.USER]: {},
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <NetworkError
              textError={`some error`}
            />
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
