import * as React from "react";
import * as renderer from "react-test-renderer";
import withActiveCard from "./with-active-card";
import {noop} from "../../utils";


const MockComponent = () => <div/>;

const MockComponentWrapped = withActiveCard(MockComponent);

describe(`Snapshot of withActiveCards`, () => {
  it(`withActiveCards should render correctly`, () => {
    const tree = renderer
      .create(
          <MockComponentWrapped
            onActiveCard={noop}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
