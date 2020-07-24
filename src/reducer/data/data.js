import {extend} from "../../utils.js";
import {cityAdapter, localOffersAdapter} from "../../adapter.js";


let offers = [];
let favourite = [];

const initialState = {
  offers,
  favourite,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_FAVOURITE: `LOAD_FAVOURITE`,
  CHANGE_FAVOURITE: `CHANGE_FAVOURITE`,
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
};

const convertCity = (item) => {
  const isExist = offers.some((it) => it.city === item[`city`][`name`]);
  if (!isExist) {
    offers.push(cityAdapter(item));
  }
};

const convertLocalOffers = (item) => {
  offers.forEach((it) => {
    if (it.city === item[`city`][`name`]) {
      it.localOffers.push(localOffersAdapter(item));
    }
  });
};


const extendFavouriteOffer = (state, offer) => {
  let changedOfferIndex;

  const changedCityIndex = state.offers.findIndex((city) => {
    changedOfferIndex = city.localOffers.findIndex((localOffer) => localOffer.id === offer.id);
    return changedOfferIndex !== -1;
  });

  const copyOffers = state.offers.map((city, i) => {

    if (i === changedCityIndex) {
      city.localOffers[changedOfferIndex] = extend(city.localOffers[changedOfferIndex], {
        isFavourite: offer.isFavourite
      });
      return city;
    }

    return city;
  });

  return extend(state, {
    offers: copyOffers
  });
};


const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        response.data.forEach((it) => {
          convertCity(it);
          convertLocalOffers(it);
        });
        dispatch(ActionCreator.loadOffers(offers));
      });
  },

  loadFavourite: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
    .then((response) => {
      dispatch(ActionCreator.loadFavourite(response.data));
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
      return extendFavouriteOffer(state, action.payload);
  }
  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
