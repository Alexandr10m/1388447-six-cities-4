import {extend} from "../../utils.js";
import {cityAdapter, localOffersAdapter, reviewAdapter} from "../../adapter.js";


const StatusOfReviewLoad = {
  LOADED: `LOADED`,
  ERROR: `ERROR`,
  NOT_IN_PROCESS: `NOT_IN_PROCESS`,
};

const initialState = {
  offers: [],
  favourite: [],
  reviews: [],
  nearbyOffers: [],
  cities: [],
  isLoadingOffes: true,
  isLoadingFavourite: true,
  isLoadingReviews: true,
  statusOfReviewLoad: StatusOfReviewLoad.NOT_IN_PROCESS,
  isLoadingNearbyOffers: true,
  isErrorOfNetwork: false,
  textError: ``,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_FAVOURITE: `LOAD_FAVOURITE`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_NESRBY_OFFERS: `LOAD_NESRBY_OFFERS`,
  LOAD_CITIES: `LOAD_CITIES`,
  CHANGE_FAVOURITE: `CHANGE_FAVOURITE`,
  LOADING_OFFERS_PROGRESS: `LOADING_OFFERS_PROGRESS`,
  LOADING_FAVOURITE_PROGRESS: `LOADING_FAVOURITE_PROGRESS`,
  LOADING_REVIEWS_PROGRESS: `LOADING_REVIEWS_PROGRESS`,
  STATUS_OF_REVIEW_LOAD: `STATUS_OF_REVIEW_LOAD`,
  LOADING_NEAREST_OFFERS_PROGRESS: `LOADING_NEAREST_OFFERS_PROGRESS`,
  ERROR: `ERROR`,
  CHANGE_TEXT_ERROR: `CHANGE_TEXT_ERROR`,
};

const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  loadFavourite: (favouriteOffers) => ({
    type: ActionType.LOAD_FAVOURITE,
    payload: favouriteOffers,
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
  loadNearbyOffers: (nearbyOffers) => ({
    type: ActionType.LOAD_NESRBY_OFFERS,
    payload: nearbyOffers,
  }),
  loadCities: (cities) => ({
    type: ActionType.LOAD_CITIES,
    payload: cities,
  }),
  changeFavourite: (offer) => ({
    type: ActionType.CHANGE_FAVOURITE,
    payload: offer,
  }),
  loadingOffersProgress: () => ({
    type: ActionType.LOADING_OFFERS_PROGRESS,
    payload: false,
  }),
  loadingFavouriteProgress: () => ({
    type: ActionType.LOADING_FAVOURITE_PROGRESS,
    payload: false,
  }),
  loadingReviewsProgress: (bool) => ({
    type: ActionType.LOADING_REVIEWS_PROGRESS,
    payload: bool,
  }),
  changeStatusOfReviewLoad: (status) => ({
    type: ActionType.STATUS_OF_REVIEW_LOAD,
    payload: status,
  }),
  loadingNearbestOffersProgress: (bool) => ({
    type: ActionType.LOADING_NEAREST_OFFERS_PROGRESS,
    payload: bool,
  }),
  showError: (bool) => ({
    type: ActionType.ERROR,
    payload: bool,
  }),
  changeErrorText: (err) => ({
    type: ActionType.CHANGE_TEXT_ERROR,
    payload: err,
  }),
};

const convertCity = (list, item) => {
  const isExist = list.some((it) => it.city === item[`city`][`name`]);
  if (!isExist) {
    list.push(cityAdapter(item));
  }
};

const convertLocalOffers = (list, item) => {
  list.forEach((it) => {
    if (it.city === item[`city`][`name`] && item[`id`]) {
      it.localOffers.push(localOffersAdapter(item));
    }
  });
};

const convertOffer = (list, offer) => {
  convertCity(list, offer);
  convertLocalOffers(list, offer);
};

const extendFavouriteByProperty = (state, property, favourite) => {
  let changedOfferIndex;

  const changedCityIndex = state[property].findIndex((city) => {
    changedOfferIndex = city.localOffers.findIndex((localOffer) => localOffer.id === favourite.id);
    return changedOfferIndex !== -1;
  });

  const copyOffers = state[property].map((city, i) => {

    if (i === changedCityIndex) {
      city.localOffers[changedOfferIndex] = extend(city.localOffers[changedOfferIndex], {
        isFavourite: favourite.isFavourite
      });
      return city;
    }

    return city;
  });

  return extend(state, {
    [property]: copyOffers
  });
};

const extendFavouriteInNearbyOffers = (state, property, favourite) => {

  const changedOfferIndex = state[property].findIndex((offer) => offer.id === favourite.id);

  if (changedOfferIndex === -1) {
    return state;
  }

  const changedOffer = extend(state[property][changedOfferIndex], {
    isFavourite: favourite.isFavourite,
  });

  const copyNearbyOffers = [
    ...state[property].slice(0, changedOfferIndex),
    changedOffer,
    ...state[property].slice(changedOfferIndex + 1),
  ];

  return extend(state, {
    [property]: copyNearbyOffers
  });
};

const extendFavourite = (state, favouriteOffer) => {
  let copyState = {};

  copyState = extendFavouriteByProperty(state, `offers`, favouriteOffer);
  copyState = extendFavouriteByProperty(copyState, `favourite`, favouriteOffer);
  copyState = extendFavouriteInNearbyOffers(copyState, `nearbyOffers`, favouriteOffer);

  return copyState;
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        let offersByCity = [];
        response.data.forEach((it) => convertOffer(offersByCity, it));

        const cities = offersByCity.map((it) => it.city);

        dispatch(ActionCreator.loadCities(cities));
        dispatch(ActionCreator.loadOffers(offersByCity));
        dispatch(ActionCreator.loadingOffersProgress());
      })
      .catch((err) => {
        throw err;
      });
  },

  loadFavourite: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
    .then((response) => {
      let favouriteOffers = [];
      response.data.forEach((it) => convertOffer(favouriteOffers, it));
      dispatch(ActionCreator.loadFavourite(favouriteOffers));
      dispatch(ActionCreator.loadingFavouriteProgress());
    })
    .catch((err) => {
      throw err;
    });
  },

  loadReviews: (offerId) => (dispatch, getState, api) => {
    return api.get(`comments/${offerId}`)
      .then((response) => {
        const reviews = response.data.map((review) => reviewAdapter(review));
        dispatch(ActionCreator.loadReviews(reviews));
        dispatch(ActionCreator.loadingReviewsProgress(false));
      })
      .catch((err) => {
        throw err;
      });
  },

  sendReview: (commentData, hotelId) => (dispatch, getState, api) => {
    return api.post(`/comments/${hotelId}`, {
      comment: commentData.comment,
      rating: commentData.rating,
    })
      .then((response) =>{
        const reviews = response.data.map((review) => reviewAdapter(review));
        dispatch(ActionCreator.loadReviews(reviews));
        dispatch(ActionCreator.changeStatusOfReviewLoad(StatusOfReviewLoad.LOADED));
      })
      .catch((err) => {
        dispatch(ActionCreator.changeStatusOfReviewLoad(StatusOfReviewLoad.ERROR));
        throw err;
      });
  },

  loadNearbyOffers: (offerId) => (dispatch, getState, api) => {
    return api.get(`hotels/${offerId}/nearby`)
      .then((response) => {
        const nearbyOffers = response.data.map((offer) => localOffersAdapter(offer));

        dispatch(ActionCreator.loadNearbyOffers(nearbyOffers));
        dispatch(ActionCreator.loadingNearbestOffersProgress(false));
      })
      .catch((err) => {
        throw err;
      });
  },

  sendFavouriteOption: (options) => (dispatch, getState, api) => {
    return api.post(`/favorite/${options.id}/${options.status}`)
      .then((response) => {
        const offer = localOffersAdapter(response.data);
        dispatch(ActionCreator.changeFavourite(offer));
      })
      .catch((err) => {
        throw err;
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
    case ActionType.LOAD_FAVOURITE:
      return extend(state, {
        favourite: action.payload,
      });
    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
    case ActionType.LOAD_NESRBY_OFFERS:
      return extend(state, {
        nearbyOffers: action.payload,
      });
    case ActionType.LOAD_CITIES:
      return extend(state, {
        cities: action.payload,
      });
    case ActionType.CHANGE_FAVOURITE:
      return extendFavourite(state, action.payload);

    case ActionType.LOADING_OFFERS_PROGRESS:
      return extend(state, {
        isLoadingOffes: action.payload,
      });
    case ActionType.LOADING_FAVOURITE_PROGRESS:
      return extend(state, {
        isLoadingFavourite: action.payload,
      });
    case ActionType.LOADING_REVIEWS_PROGRESS:
      return extend(state, {
        isLoadingReviews: action.payload,
      });
    case ActionType.STATUS_OF_REVIEW_LOAD:
      return extend(state, {
        statusOfReviewLoad: action.payload,
      });
    case ActionType.LOADING_NEAREST_OFFERS_PROGRESS:
      return extend(state, {
        isLoadingNearbyOffers: action.payload,
      });
    case ActionType.CHANGE_TEXT_ERROR:
      return extend(state, {
        textError: action.payload,
      });
    case ActionType.ERROR:
      return extend(state, {
        isErrorOfNetwork: action.payload
      });
  }
  return state;
};


export {reducer, ActionType, ActionCreator, Operation, StatusOfReviewLoad};
