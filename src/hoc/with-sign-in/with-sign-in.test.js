import React from "react";
import renderer from "react-test-renderer";
import withSignIn from "./with-sign-in.js";


const MockComponent = () => <form></form>;
const MockComponentWrapped = withSignIn(MockComponent);

describe(`Snapshot of withSignIn`, () => {
  it(`withSignIn should render correctly`, () => {
    const tree = renderer
      .create(
          <MockComponentWrapped/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
