import {reducer, ActionType, ActionCreator, Operation} from "./data.js";
import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api.js";
import {StatusOfReviewLoad} from "./data.js";


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
  }
];

const favouriteOffers = offers;

const offersWithChangedFavouriteOffer = [
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

describe(`Test of reducer data.js`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      offers: [],
      favourite: [],
      reviews: [],
      nearbyOffers: [],
      cities: [],
      isLoadOffes: true,
      isLoadFavourite: true,
      isLoadingReviews: true,
      statusOfReviewLoad: StatusOfReviewLoad.NOT_IN_PROCESS,
      isLoadingNearbyOffers: true,
    });
  });

  it(`Reducer should update offers by load offers`, () => {
    expect(reducer({
      offers: [],
      isLoadOffes: true,
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    })).toEqual({
      offers,
      isLoadOffes: true,
    });
  });

  it(`Reducer should update favourite-offers by load favourite`, () => {
    expect(reducer({
      favourite: [],
      isLoadFavourite: true,
    }, {
      type: ActionType.LOAD_FAVOURITE,
      payload: favouriteOffers,
    })).toEqual({
      favourite: favouriteOffers,
      isLoadFavourite: true,
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
      title: `Penthouse, 4-5 rooms + 5 balconies`,
      type: `hotel`,
    };

    expect(reducer({
      offers,
      favourite: [],
      nearbyOffers: [],
    }, {
      type: ActionType.CHANGE_FAVOURITE,
      payload: offer,
    })).toEqual({
      offers: offersWithChangedFavouriteOffer,
      favourite: [],
      nearbyOffers: [],
    });
  });

  it(`Reducer should update reviews by load reviews`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: offers,
    })).toEqual({
      reviews: offers,
    });
  });

  it(`Reducer should update reviews by load reviews`, () => {
    expect(reducer({
      nearbyOffers: [],
    }, {
      type: ActionType.LOAD_NESRBY_OFFERS,
      payload: offers,
    })).toEqual({
      nearbyOffers: offers,
    });
  });

  it(`Reducer should update isLoadFavourite`, () => {

    expect(reducer({
      isLoadFavourite: true,
    }, {
      type: ActionType.PROGRESS_LOAD_FAVOURITE,
      payload: false,
    })).toEqual({
      isLoadFavourite: false,
    });
  });

  it(`Reducer should update isLoadOffes`, () => {

    expect(reducer({
      isLoadOffes: true,
    }, {
      type: ActionType.PROGRESS_LOAD_OFFERS,
      payload: false,
    })).toEqual({
      isLoadOffes: false,
    });
  });

  it(`Reducer should update isLoadingReviews`, () => {

    expect(reducer({
      isLoadingReviews: true,
    }, {
      type: ActionType.LOADING_REVIEWS_IN_PROGRESS,
      payload: false,
    })).toEqual({
      isLoadingReviews: false,
    });
  });

  it(`Reducer should update isLoadingNearbyOffers`, () => {

    expect(reducer({
      isLoadingNearbyOffers: true,
    }, {
      type: ActionType.LOADING_NEARBY_OFFERS_IN_PROGRESS,
      payload: false,
    })).toEqual({
      isLoadingNearbyOffers: false,
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

  it(`Should return correct action`, () => {
    expect(ActionCreator.loadReviews(offerWithFavourite)).toEqual({
      type: ActionType.LOAD_REVIEWS,
      payload: offerWithFavourite,
    });
  });

  it(`Should return correct action`, () => {
    expect(ActionCreator.loadNearbyOffers(offerWithFavourite)).toEqual({
      type: ActionType.LOAD_NESRBY_OFFERS,
      payload: offerWithFavourite,
    });
  });

  it(`Should return correct action`, () => {
    expect(ActionCreator.loadingReviewsInProgress(true)).toEqual({
      type: ActionType.LOADING_REVIEWS_IN_PROGRESS,
      payload: true,
    });
  });

  it(`Should return correct action`, () => {
    expect(ActionCreator.progressLoadFavoutite()).toEqual({
      type: ActionType.PROGRESS_LOAD_FAVOURITE,
      payload: false,
    });
  });

  it(`Should return correct action`, () => {
    expect(ActionCreator.loadingNearbyOffersInProgress(true)).toEqual({
      type: ActionType.LOADING_NEARBY_OFFERS_IN_PROGRESS,
      payload: true,
    });
  });
});

const api = createAPI(()=>{});
const StatusFavourite = {
  ADD: 1,
  REMOVE: 0,
};
const serverResponse = {
  bedrooms: 5,
  city: {
    name: `Amsterdam`,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    }
  },
  description: `I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.`,
  goods: [`Laptop friendly workspace`],
  host: {
    id: 25,
    name: `Angelina`,
    [`is_pro`]: true,
    [`avatar_url`]: `img/avatar-angelina.jpg`
  },
  id: 1,
  images: [
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg`
  ],
  [`is_favorite`]: true,
  [`is_premium`]: false,
  location: {
    latitude: 52.385540000000006,
    longitude: 4.886976,
    zoom: 16,
  },
  [`max_adults`]: 6,
  [`preview_image`]: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
  price: 813,
  rating: 2.4,
  title: `Wood and stone place`,
  type: `house`,
};

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();
    const convertedServerResponse = {
      city: `Amsterdam`,
      cityCoords: [
        52.37454,
        4.897976
      ],
      cityZoom: 13,
      localOffers: [{
        bedroom: 5,
        coords: [
          52.385540000000006,
          4.886976,
        ],
        description: `I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.`,
        facilities: [`Laptop friendly workspace`],
        grade: 2.4,
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
        maxAdults: 6,
        pictures: [
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg`,
        ],
        previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
        price: 813,
        title: `Wood and stone place`,
        type: `house`,
      }],
    };

    apiMock
      .onGet()
      .reply(200, [serverResponse]);
    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_CITIES,
          payload: [convertedServerResponse.city],
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_OFFERS,
          payload: [convertedServerResponse],
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.PROGRESS_LOAD_OFFERS,
          payload: false,
        });
      });
  });

  it(`Should make a correct API call GET to /favorite`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favouriteLoader = Operation.loadFavourite();
    const convertedServerResponse = {
      city: `Amsterdam`,
      cityCoords: [
        52.37454,
        4.897976
      ],
      cityZoom: 13,
      localOffers: [{
        bedroom: 5,
        coords: [
          52.385540000000006,
          4.886976,
        ],
        description: `I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.`,
        facilities: [`Laptop friendly workspace`],
        grade: 2.4,
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
        maxAdults: 6,
        pictures: [
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`,
          `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg`,
        ],
        previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
        price: 813,
        title: `Wood and stone place`,
        type: `house`,
      }],
    };

    apiMock
      .onGet()
      .reply(200, [serverResponse]);
    return favouriteLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVOURITE,
          payload: [convertedServerResponse],
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.PROGRESS_LOAD_FAVOURITE,
          payload: false,
        });
      });
  });

  it(`Should make a correct API call POST to /favorite/id/status`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const convertedServerResponse = {
      bedroom: 5,
      coords: [
        52.385540000000006,
        4.886976,
      ],
      description: `I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.`,
      facilities: [`Laptop friendly workspace`],
      grade: 2.4,
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
      maxAdults: 6,
      pictures: [
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg`,
      ],
      previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
      price: 813,
      title: `Wood and stone place`,
      type: `house`,
    };
    const optionsForFavorite = {
      id: serverResponse.id,
      status: StatusFavourite.ADD,
    };
    const sendFavouriteOption = Operation.sendFavouriteOption(optionsForFavorite);


    apiMock
      .onPost()
      .reply(200, serverResponse);
    return sendFavouriteOption(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_FAVOURITE,
          payload: convertedServerResponse,
        });
      });
  });

  it(`Should make a correct API call GET to /hotels/:hotel_id/nearby`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const hotelId = 1;
    const nearbyOffersLoader = Operation.loadNearbyOffers(hotelId);
    const convertedServerResponse = {
      bedroom: 5,
      coords: [
        52.385540000000006,
        4.886976,
      ],
      description: `I rent out a very sunny and bright apartment only 7 minutes walking distance to the metro station. The apartment has a spacious living room with a kitchen, one bedroom and a bathroom with mit bath. A terrace can be used in summer.`,
      facilities: [`Laptop friendly workspace`],
      grade: 2.4,
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
      maxAdults: 6,
      pictures: [
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`,
        `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg`,
      ],
      previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
      price: 813,
      title: `Wood and stone place`,
      type: `house`,
    };

    apiMock
      .onGet()
      .reply(200, [serverResponse]);
    return nearbyOffersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_NESRBY_OFFERS,
          payload: [convertedServerResponse],
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOADING_NEARBY_OFFERS_IN_PROGRESS,
          payload: false,
        });
      });
  });

  it(`Should make a correct API call GET to /comments/:hotel_id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const hotelId = 1;
    const reviewsLoader = Operation.loadReviews(hotelId);
    const constDate = new Date(`2000-12-31T22:00:00.000Z`);
    const convertedServerResponse = {
      date: constDate,
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
    };

    const servRespons = {
      comment: `We loved it`,
      date: `2000-12-31T22:00:00.000Z`,
      id: 1,
      rating: 4,
      user: {
        [`avatar_url`]: `https`,
        id: 18,
        [`is_pro`]: true,
        name: `Sophie`,
      }
    };

    apiMock
      .onGet()
      .reply(200, [servRespons]);
    return reviewsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [convertedServerResponse],
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOADING_REVIEWS_IN_PROGRESS,
          payload: false,
        });
      });
  });


  it(`Should make a correct API call POST to /comments/:hotel_id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const constDate = new Date(`2000-12-31T22:00:00.000Z`);
    const convertedServerResponse = {
      date: constDate,
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
    };
    const servRespons = {
      comment: `We loved it`,
      date: `2000-12-31T22:00:00.000Z`,
      id: 1,
      rating: 4,
      user: {
        [`avatar_url`]: `https`,
        id: 18,
        [`is_pro`]: true,
        name: `Sophie`,
      }
    };

    const commentData = {
      comment: `We loved it`,
      rating: 4,
    };

    const senderReview = Operation.sendReview(commentData);


    apiMock
      .onPost()
      .reply(200, [servRespons]);
    return senderReview(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: [convertedServerResponse],
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.STATUS_OF_REVIEW_LOAD,
          payload: StatusOfReviewLoad.LOADED,
        });
      });
  });
});
