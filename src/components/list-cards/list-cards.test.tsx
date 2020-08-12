import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {ListCards} from "./list-cards";
import NameSpace from "../../reducer/name-space";
import {BrowserRouter} from "react-router-dom";
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

const offers: CityOffers = {
  city: `Amsterdsam`,
  cityCoords: [52.38333, 4.9],
  cityZoom: 13,
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
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <ListCards
                localOffers={offers.localOffers}
                onActiveCard={noop}
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
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <ListCards
                localOffers={offers.localOffers}
                onActiveCard={noop}
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
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <ListCards
                localOffers={offers.localOffers}
                onActiveCard={noop}
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
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH
      }
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <ListCards
                localOffers={offers.localOffers}
                onActiveCard={noop}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
