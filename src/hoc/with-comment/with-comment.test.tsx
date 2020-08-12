import * as React from "react";
import * as renderer from "react-test-renderer";
import withComment from "./with-comment";
import {StatusOfReviewLoad} from "../../reducer/data/data";
import {noop} from "../../utils";

const MockComponent = () => <div></div>;

const MockComponentWrapped = withComment(MockComponent);

describe(`Snapshot of withComment`, () => {
  it(`withComment should render correctly`, () => {
    const tree = renderer
      .create(
          <MockComponentWrapped
            onSendComment={noop}
            offerId={1}
            statusOfReviewLoad={StatusOfReviewLoad.NOT_IN_PROCESS}
            changeStatusOfReviewLoad={noop}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
