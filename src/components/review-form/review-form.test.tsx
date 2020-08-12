import React from "react";
import renderer from "react-test-renderer";
import ReviewForm from "./review-form.js";


describe(`Snapshot of ReviewForm`, () => {
  it(`Should render correctly without errors`, () => {
    const tree = renderer
      .create(
          <ReviewForm
            stars={<input/>}
            textArea={<textarea/>}
            startsError={false}
            textAreaError={false}
            buttonDisable={false}
            onSubmit={()=>{}}
            onRatingChange={()=>{}}
            loadError={false}
          >
            <div/>
          </ReviewForm>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
  it(`Should render correctly with errors`, () => {
    const tree = renderer
      .create(
          <ReviewForm
            stars={<input/>}
            textArea={<textarea/>}
            startsError={<div/>}
            textAreaError={<div/>}
            buttonDisable={false}
            onSubmit={()=>{}}
            onRatingChange={()=>{}}
            loadError={<div/>}
          >
            <div/>
          </ReviewForm>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
