import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";


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
const offers = [
  {
    city: `Paris`,
    cityCoords: [48.85661, 2.351499],
    cityZoom: 13,
    localOffers: [offerWithFavourite],
  },
  {
    city: `Amsterdam`,
    cityCoords: [52.38333, 4.9],
    cityZoom: 13,
    localOffers: [
      offerWithPremium,
    ]
  }
];

const city = `Amsterdam`;

const props = {
  city,
  offers,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  authInfo: {
    email: `iii`
  },
  login: ()=>{},
  onCityClick: ()=>{},
  onCardTitleClick: ()=>{},
};

describe(`Snapshot of App`, () => {
  it(`AppComponent should render OfferPage with offerWithoutFavourite`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
        sortType: `Price: low to high`,
        indicatedCard: offerWithPremium,
        showedOffer: offerWithFavourite,
        city: `Amsterdam`,
      },
      [NameSpace.DATA]: {
        offers
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        authInfo: {
          email: `iii`
        },
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              {...props}
            />
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`AppComponent should render Main page`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
        sortType: `Price: low to high`,
        indicatedCard: offerWithPremium,
        showedOffer: null,
        city: `Amsterdam`,
      },
      [NameSpace.DATA]: {
        offers
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        authInfo: {
          email: `iii`
        },
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              {...props}
            />
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`AppComponent should render SignIn page`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
        sortType: `Price: low to high`,
        indicatedCard: offerWithPremium,
        showedOffer: null,
        city: `Amsterdam`,
      },
      [NameSpace.DATA]: {
        offers
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        authInfo: {
          email: `iii`
        },
      },
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <App
              {...props}
            />
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
