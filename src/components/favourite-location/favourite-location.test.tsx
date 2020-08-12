import React from "react";
import renderer from "react-test-renderer";
import FavouriteLocation from "./favourite-location.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
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
  id: 1,
  isFavourite: false,
  isPremium: true,
  locationZoom: 16,
  maxAdults: 8,
  pictures: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`],
  previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
  price: 397,
  reviews: [{
    image: `img/avatar-max.jpg`,
    text: `A quiet cozy and picturesque.`,
    name: `Max`,
    time: `April 2019`
  }],
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
  reviews: [{
    image: `img/avatar-max.jpg`,
    text: `A quiet cozy and picturesque.`,
    name: `Max`,
    time: `April 2019`
  }],
  title: `Penthouse, 4-5 rooms + 5 balconies`,
  type: `hotel`,
};

const localOffers = [offerWithFavourite, offerWithPremium];

describe(`Snapshot of FavouriteLocation`, () => {
  const store = mockStore({
    [NameSpace.STATE]: {},
    [NameSpace.DATA]: {},
    [NameSpace.USER]: {},
  });
  it(`Should render correctly`, () => {
    const tree = renderer
    .create(
        <Provider store={store}>
          <BrowserRouter>
            <FavouriteLocation
              city={`Paris`}
              localOffers={localOffers}
            />
          </BrowserRouter>
        </Provider>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

