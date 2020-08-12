import * as React from "react";
import * as renderer from "react-test-renderer";
import Review from "./review";
import {Review as ReviewInterface} from "../../types";

const review: ReviewInterface = {
  date: new Date(1),
  grade: 4,
  id: 1,
  text: `We loved it`,
  user: {
    avatarUrl: `https`,
    email: undefined,
    id: 18,
    isPro: true,
    name: `Sophie`,
  },
};


describe(`Snapshot of Review`, () => {
  it(`Review should render correctly`, () => {
    const tree = renderer
      .create(
          <Review
            {...review}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
