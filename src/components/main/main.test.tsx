import * as React from "react";
import * as renderer from "react-test-renderer";
import {Main} from "./main";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {BrowserRouter} from "react-router-dom";
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

const emptyLocalOffers = {
  city: `Paris`,
  cities: [`Paris`, `Amsterdam`],
  cityCoords: [52.38333, 4.9],
  cityZoom: 16,
  localOffers: [],
};

describe(`Snapshot of Main`, () => {
  it(`MainComponent should render MainOffers component`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
        city: `Amsterdam`,
        sortType: `Price: low to high`,
        indicatedCard: {},
      },
      [NameSpace.DATA]: {
        offers: allOffers,
        cities: [`Paris`, `Amsterdam`],
      },
      [NameSpace.USER]: {
        authInfo: {
          email: `iii`
        },
      }
    });
    const match = {
      params: {
        city: `Paris`
      }
    };
    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <Main
                offers={allOffers}
                cities={[`Paris`, `Amsterdam`]}
                onCityClick={noop}
                match={match}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`MainComponent should render MainEmpty compoment`, () => {
    const store = mockStore({
      [NameSpace.STATE]: {
        city: `Paris`,
        indicatedCard: {},
      },
      [NameSpace.DATA]: {
        offers: [emptyLocalOffers],
        cities: [`Paris`, `Amsterdam`],
      },
      [NameSpace.USER]: {
        authInfo: {
          email: `iii`
        },
      }
    });
    const match = {
      params: {
        city: `Paris`
      }
    };
    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <Main
                offers={[emptyLocalOffers]}
                cities={[`Paris`, `Amsterdam`]}
                onCityClick={noop}
                match={match}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
