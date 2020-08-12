import React from "react";
import renderer from "react-test-renderer";
import {Main} from "./main.js";
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

const allOffers = [
  {
    city: `Paris`,
    cityCoords: [48.85661, 2.351499],
    cityZoom: 13,
    localOffers: [offerWithFavourite, offerWithPremium],
  },
  {
    city: `Amsterdam`,
    cityCoords: [52.38333, 4.9],
    localOffers: []
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
                onCityClick={()=>{}}
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
        city: `Amsterdam`,
        indicatedCard: {},
      },
      [NameSpace.DATA]: {
        offers: emptyLocalOffers,
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
        city: `Amsterdam`
      }
    };
    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <Main
                offers={allOffers}
                cities={[`Paris`, `Amsterdam`]}
                onCityClick={()=>{}}
                match={match}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
