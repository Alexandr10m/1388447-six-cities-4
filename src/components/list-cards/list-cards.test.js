import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {ListCards} from "./list-cards.jsx";
import NameSpace from "../../reducer/name-space.js";
import {BrowserRouter} from "react-router-dom";


const mockStore = configureStore([]);

const offerWithPremium = {
  bedroom: 2,
  coords: [48.865610000000004, 2.350499],
  description: `Discover daily local life in city center.`,
  facilities: [`Air conditioning`, `Breakfast`],
  grade: 3.6,
  host: {
    avatarUrl: `img/avatar-angelina.jpg`,
    id: 25,
    isPro: true,
    name: `Angelina`,
  },
  id: 0,
  isFavourite: false,
  isPremium: true,
  locationZoom: 16,
  maxAdults: 8,
  pictures: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`],
  previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
  price: 397,
  reviews: {
    image: `img/avatar-max.jpg`,
    text: `A quiet cozy and picturesque.`,
    name: `Max`,
    time: `April 2019`
  },
  title: `Penthouse, 4-5 rooms + 5 balconies`,
  type: `hotel`,
};
const offerWithFavourite = {
  bedroom: 2,
  coords: [48.865610000000004, 2.350499],
  description: `Discover daily local life in city center.`,
  facilities: [`Air conditioning`, `Breakfast`],
  grade: 3.6,
  host: {
    avatarUrl: `img/avatarangelina.jpg`,
    id: 25,
    isPro: false,
    name: `Angela`,
  },
  id: 2,
  isFavourite: true,
  isPremium: true,
  locationZoom: 16,
  maxAdults: 8,
  pictures: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`],
  previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
  price: 397,
  reviews: {
    image: `img/avatar-max.jpg`,
    text: `A quiet cozy and picturesque.`,
    name: `Max`,
    time: `April 2019`
  },
  title: `Penthouse, 4-5 rooms + 5 balconies`,
  type: `hotel`,
};

const offers = {
  city: `Amsterdsam`,
  citycoords: [52.38333, 4.9],
  localOffers: [
    offerWithPremium,
    offerWithFavourite,
  ],
};


describe(`Snapshot of ListCards`, () => {
  it(`Card should render correctly Popular sort`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
        sortType: `Price: low to high`,
        city: `Amsterdam`,
      },
      [NameSpace.DATA]: {
        offers
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <ListCards
                localOffers={offers.localOffers}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Card should render correctly Price: low to high sort`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
        sortType: `Price: low to high`,
        city: `Amsterdam`,
      },
      [NameSpace.DATA]: {
        offers
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <ListCards
                localOffers={offers.localOffers}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Card should render correctly Price: high to low sort`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
        sortType: `Price: low to high`,
        city: `Amsterdam`,
      },
      [NameSpace.DATA]: {
        offers
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <ListCards
                localOffers={offers.localOffers}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Card should render correctly - Top rated first sort`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
        sortType: `Price: low to high`,
        city: `Amsterdam`,
      },
      [NameSpace.DATA]: {
        offers
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <ListCards
                localOffers={offers.localOffers}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
