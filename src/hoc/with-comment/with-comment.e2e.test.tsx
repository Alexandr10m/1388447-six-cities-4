import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import withComment from "./with-comment";
import {StatusOfReviewLoad} from "../../reducer/data/data";
import {noop} from "../../utils";


configure({adapter: new Adapter()});

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
          changeStatusOfReviewLoad={noop}
          onSendComment={noop}
          offerId={1}
        />);
    wrapper.props().onRatingChange(evtMock);
    expect(wrapper.state(`rate`)).toEqual(3);
  });
});
