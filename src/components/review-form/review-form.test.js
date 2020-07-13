import React from "react";
import renderer from "react-test-renderer";
import ReviewForm from "./review-form.jsx";


describe(`Snapshot of ReviewForm`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(
          <ReviewForm
            offerId={1}
            onSendComment={()=>{}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
