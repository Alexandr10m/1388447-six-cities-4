import * as React from "react";
import * as renderer from "react-test-renderer";
import withSignIn from "./with-sign-in";


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
