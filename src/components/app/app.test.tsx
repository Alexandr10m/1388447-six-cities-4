import * as React from "react";
import * as renderer from "react-test-renderer";
import {App} from "./app";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user";
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
const offers: CityOffers[] = [
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
    localOffers: [offerWithPremium],
  }
];

const city = `Amsterdam`;

const props = {
  city,
  offers,
  cities: [`Amsterdam`, `Humburg`, `Paris`],
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  favourite: [],
  isLoadOffes: false,
  checkAuth: noop,
  loadOffers: noop,
};

describe(`Snapshot of App`, () => {
  it(`AppComponent should render OfferPage with offerWithoutFavourite`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
        sortType: `Price: low to high`,
        indicatedCard: offerWithPremium,
        city: `Amsterdam`,
      },
      [NameSpace.DATA]: {
        offers,
        cities: [`Amsterdam`, `Humburg`, `Paris`],
        favourite: [],
        isLoadOffes: false,
        isErrorOfNetwork: false,
        textError: ``,
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
              isErrorOfNetwork={false}
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
        city: `Amsterdam`,
      },
      [NameSpace.DATA]: {
        offers,
        cities: [`Amsterdam`, `Humburg`, `Paris`],
        favourite: [],
        isLoadOffes: false,
        isErrorOfNetwork: false,
        textError: ``,
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
              isErrorOfNetwork={false}
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
        city: `Amsterdam`,
      },
      [NameSpace.DATA]: {
        offers,
        cities: [`Amsterdam`, `Humburg`, `Paris`],
        favourite: [],
        isLoadOffes: false,
        isErrorOfNetwork: false,
        textError: ``,
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
              isErrorOfNetwork={false}
            />
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`AppComponent should render NetworkError`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
        sortType: `Price: low to high`,
        indicatedCard: offerWithPremium,
        city: `Amsterdam`,
      },
      [NameSpace.DATA]: {
        offers,
        cities: [`Amsterdam`, `Humburg`, `Paris`],
        favourite: [],
        isLoadOffes: false,
        isErrorOfNetwork: true,
        textError: `Error`,
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
              isErrorOfNetwork={true}
            />
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
