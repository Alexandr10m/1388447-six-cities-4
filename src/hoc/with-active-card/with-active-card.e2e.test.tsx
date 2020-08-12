import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import withActiveCard from "./with-active-card";
import {LocalOffer} from "../../types";


configure({adapter: new Adapter()});

const offerWithPremium: LocalOffer = {
  bedroom: 2,
  coords: [48.865610000000004, 2.350499],
  description: `in city center.`,
  facilities: [`Air conditioning`, `Breakfast`],
  grade: 3.6,
  host: {
    avatarUrl: `img/avatar-angelina.jpg`,
    id: 25,
    isPro: true,
    name: `Angelina`,
  },
  id: 1,
  isFavourite: false,
  isPremium: true,
  locationZoom: 16,
  maxAdults: 8,
  pictures: [`https://`, `https`],
  previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
  price: 397,
  title: `Penthouse`,
  type: `hotel`,
};
const offerWithFavourite: LocalOffer = {
  bedroom: 2,
  coords: [48.865610000000004, 2.350499],
  description: `in city center.`,
  facilities: [`Air conditioning`, `Breakfast`],
  grade: 3.6,
  host: {
    avatarUrl: `img/avatar-angelina.jpg`,
    id: 25,
    isPro: true,
    name: `Angelina`,
  },
  id: 1,
  isFavourite: true,
  isPremium: false,
  locationZoom: 16,
  maxAdults: 8,
  pictures: [`https://`, `https`],
  previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
  price: 397,
  title: `Penthouse`,
  type: `hotel`,
};

const offers: LocalOffer[] = [
  offerWithPremium,
  offerWithFavourite,
];
const MockComponent = () => <div/>;

const MockComponentWrapped = withActiveCard(MockComponent);

describe(`E2E of withActiveCards`, () => {
  it(`withActiveCards should change activeCard`, () => {

    const wrapper = shallow(
        <MockComponentWrapped
          offers={offers}
        />);

    wrapper.props().onActiveCard(offerWithPremium);
    expect(wrapper.state(`activeCard`)).toEqual(offerWithPremium);
  });
});
