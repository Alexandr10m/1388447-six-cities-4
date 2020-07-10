import {extend} from "./utils.js";
import {cityAdapter, localOffersAdapter} from "./adapter.js";

let offers = [];

const initialState = {
  offers,
  city: `Paris`,
  localOffers: [],
  showedOffer: null,
  sortType: `Popular`,
  indicatedCard: null,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_LOCAL_OFFERS: `CHANGE_LOCAL_OFFERS`,
  SHOW_OFFER: `SHOW_OFFER`,
  RESET_SHOWED_OFFER: `RESET_SHOWED_OFFER`,
  CHANGE_SORT: `CHANGE_SORT`,
  SHOW_POINTER: `SHOW_POINTER`,
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),

  resetShowedOffer: () => ({
    type: ActionType.RESET_SHOWED_OFFER,
    payload: null,
  }),

  showOffer: (offer) => ({
    type: ActionType.SHOW_OFFER,
    payload: offer,
  }),

  changeSort: (sortType) => ({
    type: ActionType.CHANGE_SORT,
    payload: sortType,
  }),

  showPoiner: (offer) => ({
    type: ActionType.SHOW_POINTER,
    payload: offer,
  }),

  loadOffers: (data) => ({
    type: ActionType.LOAD_OFFERS,
    payload: data,
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {
        city: action.payload,
      });

    case ActionType.CHANGE_LOCAL_OFFERS:
      return extend(state, {
        offers: action.payload
      });

    case ActionType.SHOW_OFFER:
      return extend(state, {
        showedOffer: action.payload
      });

    case ActionType.RESET_SHOWED_OFFER:
      return extend(state, {
        showedOffer: action.payload
      });

    case ActionType.CHANGE_SORT:
      return extend(state, {
        sortType: action.payload,
      });

    case ActionType.SHOW_POINTER:
      return extend(state, {
        indicatedCard: action.payload,
      });
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
