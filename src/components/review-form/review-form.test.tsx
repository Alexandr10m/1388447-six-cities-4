import * as React from "react";
import * as renderer from "react-test-renderer";
import ReviewForm from "./review-form";
import {noop} from "../../utils";


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
            onSubmit={noop}
            onRatingChange={noop}
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
            onSubmit={noop}
            onRatingChange={noop}
            loadError={<div/>}
          >
            <div/>
          </ReviewForm>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
