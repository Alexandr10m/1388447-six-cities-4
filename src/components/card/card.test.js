import React from "react";
import renderer from "react-test-renderer";
import Card from "./card.jsx";

describe(`Snapshot of Card`, () => {
  it(`Card should render`, () => {
    const tree = renderer
      .create(
          <Card
            offerName={`Wood and stone place`}
            grade={80}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
