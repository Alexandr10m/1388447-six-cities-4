import {reducer, ActionType, ActionCreator} from "./data.js";


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
  reviews: {
    image: `img/avatar-max.jpg`,
    text: `A quiet cozy and picturesque.`,
    name: `Max`,
    time: `April 2019`
  },
  title: `Penthouse, 4-5 rooms + 5 balconies`,
  type: `hotel`,
};

const offerWithPremiumAndFavourite = {
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
  isFavourite: true,
  isPremium: true,
  locationZoom: 16,
  maxAdults: 8,
  pictures: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`],
  previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
  price: 397,
  reviews: {
    image: `img/avatar-max.jpg`,
    text: `A quiet cozy and picturesque.`,
    name: `Max`,
    time: `April 2019`
  },
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
  reviews: {
    image: `img/avatar-max.jpg`,
    text: `A quiet cozy and picturesque.`,
    name: `Max`,
    time: `April 2019`
  },
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
    localOffers: [offerWithPremium],
  }];

const favouriteOffers = offers;

const offerWithChanedFavouriteOffer = [
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
    localOffers: [offerWithPremiumAndFavourite],
  }];

describe(`Test of reduser data.js`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      offers: [],
      favourite: [],
    });
  });

  it(`Reducer should update offers by load offers`, () => {
    expect(reducer({
      offers: [],
      favourite: [],
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    })).toEqual({
      offers,
      favourite: [],
    });
  });

  it(`Reducer should update favourite-offers by load favourite`, () => {
    expect(reducer({
      offers: [],
      favourite: [],
    }, {
      type: ActionType.LOAD_FAVOURITE,
      payload: favouriteOffers,
    })).toEqual({
      offers: [],
      favourite: favouriteOffers,
    });
  });

  it(`Reducer should update one favourite offer`, () => {
    const offer = {
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
      isFavourite: true,
      isPremium: true,
      locationZoom: 16,
      maxAdults: 8,
      pictures: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`],
      previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
      price: 397,
      reviews: {
        image: `img/avatar-max.jpg`,
        text: `A quiet cozy and picturesque.`,
        name: `Max`,
        time: `April 2019`
      },
      title: `Penthouse, 4-5 rooms + 5 balconies`,
      type: `hotel`,
    };

    expect(reducer({
      offers,
      favourite: [],
    }, {
      type: ActionType.CHANGE_FAVOURITE,
      payload: offer,
    })).toEqual({
      offers: offerWithChanedFavouriteOffer,
      favourite: [],
    });
  });
});

describe(`Test of ActionCreator reducer data.js`, () => {
  it(`Should return correct action`, () => {
    expect(ActionCreator.loadOffers(offers)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    });
  });

  it(`Should return correct action`, () => {
    expect(ActionCreator.loadFavourite(favouriteOffers)).toEqual({
      type: ActionType.LOAD_FAVOURITE,
      payload: favouriteOffers,
    });
  });

  it(`Should return correct action`, () => {
    expect(ActionCreator.changeFavourite(offerWithFavourite)).toEqual({
      type: ActionType.CHANGE_FAVOURITE,
      payload: offerWithFavourite,
    });
  });
});
