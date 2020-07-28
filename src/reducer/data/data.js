import {extend} from "../../utils.js";
import {cityAdapter, localOffersAdapter, reviewAdapter} from "../../adapter.js";


const initialState = {
  offers: [],
  favourite: [],
  reviews: [],
  isLoadOffes: true,
  isLoadFavourite: true,
  isLoadingReviews: true,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_FAVOURITE: `LOAD_FAVOURITE`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  CHANGE_FAVOURITE: `CHANGE_FAVOURITE`,
  PROGRESS_LOAD_OFFERS: `PROGRESS_LOAD_OFFERS`,
  PROGRESS_LOAD_FAVOURITE: `PROGRESS_LOAD_FAVOURITE`,
  LOADING_REVIEWS_IN_PROGRESS: `LOADING_REVIEWS_IN_PROGRESS`,
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
  changeFavourite: (offer) => ({
    type: ActionType.CHANGE_FAVOURITE,
    payload: offer,
  }),
  progressLoadOffers: () => ({
    type: ActionType.PROGRESS_LOAD_OFFERS,
    payload: false,
  }),
  progressLoadFavoutite: () => ({
    type: ActionType.PROGRESS_LOAD_FAVOURITE,
    payload: false,
  }),
  loadingReviewsInProgress: () => ({
    type: ActionType.LOADING_REVIEWS_IN_PROGRESS,
    payload: false,
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

const extendFavourite = (state, favouriteOffer) => {
  let copyState = {};

  copyState = extendFavouriteByProperty(state, `offers`, favouriteOffer);
  copyState = extendFavouriteByProperty(copyState, `favourite`, favouriteOffer);

  return copyState;
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

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        let offersByCity = [];
        response.data.forEach((it) => convertOffer(offersByCity, it));
        dispatch(ActionCreator.loadOffers(offersByCity));
        dispatch(ActionCreator.progressLoadOffers());
      });
  },

  loadFavourite: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
    .then((response) => {
      let favouriteOffers = [];
      response.data.forEach((it) => convertOffer(favouriteOffers, it));
      dispatch(ActionCreator.loadFavourite(favouriteOffers));
      dispatch(ActionCreator.progressLoadFavoutite());
    });
  },

  loadReviews: (offerId) => (dispatch, getState, api) => {
    return api.get(`comments/${offerId}`)
      .then((response) => {
        const reviews = response.data.map((review) => reviewAdapter(review));
        dispatch(ActionCreator.loadReviews(reviews));
        dispatch(ActionCreator.loadingReviewsInProgress());
      });
  },

  sendFavouriteOption: (options) => (dispatch, getState, api) => {
    return api.post(`/favorite/${options.id}/${options.status}`)
      .then((response) => {
        const offer = localOffersAdapter(response.data);
        dispatch(ActionCreator.changeFavourite(offer));
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
      const copyState = extend(state, {
        reviews: action.payload,
      });
      return copyState;
    case ActionType.CHANGE_FAVOURITE:
      return extendFavourite(state, action.payload);

    case ActionType.PROGRESS_LOAD_OFFERS:
      return extend(state, {
        isLoadOffes: action.payload,
      });
    case ActionType.PROGRESS_LOAD_FAVOURITE:
      return extend(state, {
        isLoadFavourite: action.payload,
      });
    case ActionType.LOADING_REVIEWS_IN_PROGRESS:
      return extend(state, {
        isLoadingReviews: action.payload,
      });
  }
  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
