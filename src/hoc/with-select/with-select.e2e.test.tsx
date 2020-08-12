import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import withSelect from "./with-select";


configure({adapter: new Adapter()});

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
