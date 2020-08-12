import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Sort} from "./sort";
import NameSpace from "../../reducer/name-space";
import {LocalOffer, CityOffers} from "../../types";
import {noop} from "../../utils";


const mockStore = configureStore([]);

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
const offerWithoutPremium: LocalOffer = {
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
const offerWithoutFavourite: LocalOffer = {
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
  isPremium: false,
  locationZoom: 16,
  maxAdults: 8,
  pictures: [`https://`, `https`],
  previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
  price: 397,
  title: `Penthouse`,
  type: `hotel`,
};

const offers: CityOffers = {
  city: `Amsterdam`,
  cityCoords: [52.38333, 4.9],
  cityZoom: 13,
  localOffers: [
    offerWithPremium,
    offerWithoutPremium,
    offerWithFavourite,
    offerWithoutFavourite
  ],
};

describe(`Snapshot of Sort`, () => {
  it(`Should render correctly`, () => {

    const store = mockStore({
      [NameSpace.STATE]: {
        sortType: `Popular`,
      },
      [NameSpace.DATA]: {
        offers,
      },
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <Sort
            sortType={`Price: low to high`}
            isShowOptions={false}
            onHideOptions={noop}
            onSelectClick={noop}
            onToggleViewOptions={noop}
          />
        </Provider>)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
