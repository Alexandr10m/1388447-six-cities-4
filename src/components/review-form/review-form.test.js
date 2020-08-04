import React from "react";
import renderer from "react-test-renderer";
import ReviewForm from "./review-form.jsx";


describe(`Snapshot of ReviewForm`, () => {
  it(`Should render correctly`, () => {
    const tree = renderer
      .create(
          <ReviewForm
            commentText={`hello`}
            buttonDisable={false}
            isValidText={false}
            isValidRate={false}
            disabledForm={false}
            onSubmit={()=>{}}
            onRatingChange={()=>{}}
            offerId={1}
            onUserCommentEnter={()=>{}}
          >
            <div/>
          </ReviewForm>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
