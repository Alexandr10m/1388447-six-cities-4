import * as React from "react";
import * as renderer from "react-test-renderer";
import withSelect from "./with-select.js";


const MockComponent = () => <form/>;

const MockComponentWrapped = withSelect(MockComponent);

describe(`Snapshot of withSelect`, () => {
  it(`withSelect should render correctly`, () => {
    const tree = renderer
      .create(<MockComponentWrapped/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
