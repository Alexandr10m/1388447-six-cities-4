import {extend} from "./utils.js";
import {createOffers} from "./mocks/offers.js";

const DEFAULT_CITY_NAME = `Amsterdam`;
const COUNT_OF_OFFERS = 4;
const offers = createOffers(DEFAULT_CITY_NAME, COUNT_OF_OFFERS);

const initialState = {
  city: offers.city,
  offers,
  showedOffer: null,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_LOCAL_OFFERS: `CHANGE_LOCAL_OFFERS`,
  SHOW_OFFER: `SHOW_OFFER`,
  RESET_SHOWED_OFFER: `RESET_SHOWED_OFFER`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),

  changeOffers: (city) => ({
    type: ActionType.CHANGE_LOCAL_OFFERS,
    payload: createOffers(city, COUNT_OF_OFFERS),
  }),

  resetShowedOffer: () => ({
    type: ActionType.RESET_SHOWED_OFFER,
    payload: null,
  }),

  showOffer: (offer) => ({
    type: ActionType.SHOW_OFFER,
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
  }
  return state;
};

export {reducer, ActionType, ActionCreator};
