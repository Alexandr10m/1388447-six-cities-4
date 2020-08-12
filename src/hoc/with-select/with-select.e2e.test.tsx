import * as React from "react";
import {shallow} from "enzyme";
import withSelect from "./with-select.js";


const MockComponent = () => <form/>;

const MockComponentWrapped = withSelect(MockComponent);

describe(`E2E of withSelect`, () => {
  it(`withSelect should change isShowOptions`, () => {

    const wrapper = shallow(
        <MockComponentWrapped/>);

    wrapper.props().onToggleViewOptions();
    expect(wrapper.state(`isShowOptions`)).toEqual(true);
  });

  it(`withSelect should change isShowOptions to false`, () => {

    const wrapper = shallow(
        <MockComponentWrapped/>);

    wrapper.props().onToggleViewOptions();
    expect(wrapper.state(`isShowOptions`)).toEqual(true);

    wrapper.props().onHideOptions();
    expect(wrapper.state(`isShowOptions`)).toEqual(false);

  });
});
