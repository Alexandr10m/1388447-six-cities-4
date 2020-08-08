import React from "react";
import renderer from "react-test-renderer";
import Preload from "./preload.jsx";


describe(`Snapshot of Preload`, () => {
  it(`Should render correct`, () => {
    const tree = renderer
      .create(<Preload/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
