import React from "react";
import renderer from "react-test-renderer";
import CardNearest from "./card-nearest.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space.js";
import {BrowserRouter} from "react-router-dom";
import {AuthorizationStatus} from "../../reducer/user/user.js";


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
  title: `Penthouse, 4-5 rooms + 5 balconies`,
  type: `hotel`,
};

const mockStore = configureStore([]);

const store = mockStore({
  [NameSpace.STATE]: {},
  [NameSpace.DATA]: {},
  [NameSpace.USER]: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

describe(`Snapshot of CardNearest`, () => {
  it(`Card should render correctly with Primium`, () => {
    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <CardNearest
                city={`Amsterdam`}
                offer={offerWithPremium}
                onCardMouseEnter={() => {}}
                sendFavouriteOption={() => {}}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Card should render correctly with FavouriteClass`, () => {
    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <CardNearest
                city={`Amsterdam`}
                offer={offerWithFavourite}
                onCardMouseEnter={() => {}}
                sendFavouriteOption={() => {}}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
