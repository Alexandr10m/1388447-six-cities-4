import React from "react";
import renderer from "react-test-renderer";
import ReviewList from "./review-list.jsx";

const reviews = [{
  image: `img/avatar-max.jpg`,
  text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
  name: `Max`,
  time: `April 2019`,
}];

describe(`Snapshot of ReviewList`, () => {
  it(`ReviewList should render correctly`, () => {
    const tree = renderer
      .create(
          <ReviewList
            reviews={reviews}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
