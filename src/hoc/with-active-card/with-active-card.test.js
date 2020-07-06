import React from "react";
import renderer from "react-test-renderer";
import withActiveCard from "./with-active-card.js";


const MockComponent = () => <div/>;

const MockComponentWrapped = withActiveCard(MockComponent);

describe(`Snapshot of withActiveCards`, () => {
  it(`withActiveCards should render correctly`, () => {
    const tree = renderer
      .create(
          <MockComponentWrapped
            onActiveCard={()=>{}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
