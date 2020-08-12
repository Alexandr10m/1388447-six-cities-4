import * as React from "react";
import * as renderer from "react-test-renderer";
import Host from "./host";
import {Host as HostInterface} from "../../types";


const host: HostInterface = {
  avatarUrl: `img/avatar-angelina.jpg`,
  id: 25,
  isPro: true,
  name: `Angelina`,
};

const props = {
  description: `Discover daily local life in city center.`,
  host,
};

describe(`Snapshot of Host`, () => {
  it(`Host should render correctly`, () => {
    const tree = renderer
      .create(
          <Host
            {...props}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
