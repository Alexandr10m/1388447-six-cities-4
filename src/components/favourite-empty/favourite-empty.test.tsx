import * as React from "react";
import * as renderer from "react-test-renderer";
import FavouriteEmpty from "./favourite-empty.js";


describe(`Snapshot of FavouriteEmpty`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
    .create(
        <FavouriteEmpty/>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
