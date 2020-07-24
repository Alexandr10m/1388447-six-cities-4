import React from "react";
import renderer from "react-test-renderer";
import FavouriteEmpty from "./favourite-empty.jsx";


describe(`Snapshot of FavouriteEmpty`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
    .create(
        <FavouriteEmpty/>)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
