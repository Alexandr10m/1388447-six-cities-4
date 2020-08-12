import * as React from "react";
import {shallow} from "enzyme";
import withComment from "./with-comment.js";
import {StatusOfReviewLoad} from "../../reducer/data/data.js";


const MockComponent = () => <form></form>;

const MockComponentWrapped = withComment(MockComponent);

describe(`E2E of withComment`, () => {
  it(`withComment should change rate of comment`, () => {
    const evtMock = {
      target: {
        value: `3`
      }
    };

    const wrapper = shallow(
        <MockComponentWrapped
          statusOfReviewLoad={StatusOfReviewLoad.NOT_IN_PROCESS}
          changeStatusOfReviewLoad={()=>{}}
          onSendComment={()=>{}}
          offerId={1}
        />);
    wrapper.props().onRatingChange(evtMock);
    expect(wrapper.state(`rate`)).toEqual(3);
  });
});
