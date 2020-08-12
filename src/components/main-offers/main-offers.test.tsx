import * as React from "react";
import * as renderer from "react-test-renderer";
import MainOffers from "./main-offers";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {Router} from "react-router-dom";
import history from "../../history";
import {AuthorizationStatus} from "../../reducer/user/user";
import {LocalOffer, CityOffers} from "../../types";
import {noop} from "../../utils";


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

const allOffers: CityOffers[] = [
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

const mockStore = configureStore([]);

describe(`Snapshot of MainOffers`, () => {
  it(`Should render correctly`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
        sortType: `Price: low to high`,
        city: `Paris`,
      },
      [NameSpace.DATA]: {
        offers: allOffers,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
      }
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <Router history={history}>
              <MainOffers
                city={`Paris`}
                offers={allOffers[0]}
                onActiveCard={noop}
                activeCard={offerWithFavourite}
              />
            </Router>
          </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
