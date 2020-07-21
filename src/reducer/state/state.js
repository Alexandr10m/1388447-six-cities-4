import {extend} from "../../utils.js";


const initialState = {
  city: `Paris`,
  localOffers: [],
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
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
