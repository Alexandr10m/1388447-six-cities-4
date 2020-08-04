import React from "react";
import {shallow} from "enzyme";
import withComment from "./with-comment.js";
// import ReviewForm from "../../components/review-form/review-form.jsx";
import PropTypes from "prop-types";


const MockComponent = (props) => <form>{props.children}</form>;

MockComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

const MockComponentWrapped = withComment(MockComponent);

describe(`E2E of withComment`, () => {
  it(`withComment should change text of comment`, () => {
    const evtMock = {
      target: {
        value: `hello`
      }
    };

    const wrapper = shallow(
        <MockComponentWrapped
          onSendComment={()=>{}}
          offerId={1}
        />);
    wrapper.props().onUserCommentEnter(evtMock);
    expect(wrapper.state(`commentText`)).toEqual(`hello`);
  });

  it(`withComment should change rate of comment`, () => {
    const evtMock = {
      target: {
        value: `3`
      }
    };

    const wrapper = shallow(
        <MockComponentWrapped
          onSendComment={()=>{}}
          offerId={1}
        />);
    wrapper.props().onRatingChange(evtMock);
    expect(wrapper.state(`rate`)).toEqual(3);
  });
});
