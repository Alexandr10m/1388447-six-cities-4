import React from "react";
import renderer from "react-test-renderer";
import withComment from "./with-comment.js";
import PropTypes from "prop-types";


const MockComponent = (props) => <div>{props.children}</div>;

MockComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

const MockComponentWrapped = withComment(MockComponent);

describe(`Snapshot of withComment`, () => {
  it(`withComment should render correctly`, () => {
    const tree = renderer
      .create(
          <MockComponentWrapped
            onSendComment={()=>{}}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
