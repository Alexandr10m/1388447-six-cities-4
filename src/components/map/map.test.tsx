import * as React from "react";
import * as renderer from "react-test-renderer";
import Map from "./map";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {LocalOffer, CityOffers} from "../../types";


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

const store = mockStore({
  [NameSpace.STATE]: {
    sortType: `Popular`,
    indicatedCard: offerWithPremium,
    city: `Paris`,
  },
  [NameSpace.DATA]: {
    offers
  },
});

const props = {
  localOffers: [
    offerWithPremium,
    offerWithFavourite,
  ],
  cityCoords: [48.85661, 2.351499],
  cityZoom: 13,
  locationZoom: 16,
  activeCard: offerWithPremium,
};

describe(`Snapshot of Map`, () => {
  it(`Map should render correctly`, () => {
    jest.mock(`leaflet`);

    const tree = renderer
      .create(
          <Provider store={store}>
            <Map
              {...props}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
