import * as React from "react";
import * as renderer from "react-test-renderer";
import Preload from "./preload";


describe(`Snapshot of Preload`, () => {
  it(`Should render correct`, () => {
    const tree = renderer
      .create(<Preload/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
