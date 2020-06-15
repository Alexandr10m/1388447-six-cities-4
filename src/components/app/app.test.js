import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";


const offersNames = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`, `Wood and stone place`,
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`
];

const SETTINGS = {
  offersCount: offersNames.length,
  grade: 80,
  selected: `popular`,
  offersNames,
};

describe(`Snapshot of App`, () => {
  it(`AppComponent should render`, () => {
    const tree = renderer
      .create(
          <App
            {...SETTINGS}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
