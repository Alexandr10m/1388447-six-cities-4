import {extend} from "../../utils.js";
import {cityAdapter, localOffersAdapter} from "../../adapter.js";


const initialState = {
  offers: [],
  favourite: [],
  isLoadOffes: true,
  isLoadFavourite: true,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_FAVOURITE: `LOAD_FAVOURITE`,
  CHANGE_FAVOURITE: `CHANGE_FAVOURITE`,
  PROGRESS_LOAD_OFFERS: `PROGRESS_LOAD_OFFERS`,
  PROGRESS_LOAD_FAVOURITE: `PROGRESS_LOAD_FAVOURITE`,
};

const ActionCreator = {
  loadOffers: (data) => ({
    type: ActionType.LOAD_OFFERS,
    payload: data,
  }),
  loadFavourite: (favouriteOffers) => ({
    type: ActionType.LOAD_FAVOURITE,
    payload: favouriteOffers,
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
  }
  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
