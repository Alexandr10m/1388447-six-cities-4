import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";


const offersNames = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`, `Wood and stone place`,
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`
];

describe(`Snapshot of Main`, () => {
  it(`MainComponent should render`, () => {
    const tree = renderer
      .create(
          <Main
            offersCount={offersNames.length}
            grade={80}
            selected={`popular`}
            offersNames={offersNames}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
