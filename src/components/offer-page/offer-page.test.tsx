import * as React from "react";
import * as renderer from "react-test-renderer";
import {OfferPage} from "./offer-page";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user";
import {BrowserRouter} from "react-router-dom";
import {StatusOfReviewLoad} from "../../reducer/data/data";
import {LocalOffer, CityOffers, Review} from "../../types";
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
  id: 0,
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
  id: 2,
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

const reviews: Review[] = [{
  date: new Date(1),
  grade: 4,
  id: 1,
  text: `We loved it`,
  user: {
    avatarUrl: `https`,
    email: undefined,
    id: 18,
    isPro: true,
    name: `Sophie`,
  },
}];

const nearbyOffers: LocalOffer[] = [offerWithFavourite];

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

const store = mockStore({
  [NameSpace.STATE]: {
    sortType: `Price: low to high`,
    city: `Amsterdam`,
    activeCard: offerWithFavourite,
  },
  [NameSpace.DATA]: {
    offers: allOffers,
    reviews,
    nearbyOffers,
    isLoadingReviews: false,
    isLoadingNearbyOffers: false,
    statusOfReviewLoad: StatusOfReviewLoad.NOT_IN_PROCESS,
  },
  [NameSpace.USER]: {
    authInfo: {
      email: `iii`
    },
    authorizationStatus: AuthorizationStatus.AUTH
  },
});

describe(`Snapshot of OfferPage`, () => {
  it(`OfferPage should render whit Premium`, () => {
    const match = {
      params: {
        offerId: 0
      }
    };
    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <OfferPage
                match={match}
                offers={allOffers}
                sendFavouriteOption={noop}
                reviews={reviews}
                nearbyOffers={nearbyOffers}
                authorizationStatus={AuthorizationStatus.AUTH}
                loadReviews={noop}
                changeLoadingRequestsProgress={noop}
                loadNearbyOffers={noop}
                isLoadingNearbyOffers={false}
                isLoadingReviews={false}
                statusOfReviewLoad={StatusOfReviewLoad.NOT_IN_PROCESS}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`OfferPage should render whith Favourite`, () => {
    const match = {
      params: {
        offerId: 2
      }
    };
    const tree = renderer
      .create(
          <Provider store={store}>
            <BrowserRouter>
              <OfferPage
                match={match}
                offers={allOffers}
                sendFavouriteOption={noop}
                reviews={reviews}
                nearbyOffers={nearbyOffers}
                authorizationStatus={AuthorizationStatus.AUTH}
                loadReviews={noop}
                changeLoadingRequestsProgress={noop}
                loadNearbyOffers={noop}
                isLoadingNearbyOffers={false}
                isLoadingReviews={false}
                statusOfReviewLoad={StatusOfReviewLoad.NOT_IN_PROCESS}
              />
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
