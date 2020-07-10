import {extend} from "../../utils.js";
import {cityAdapter, localOffersAdapter} from "../../adapter.js";


let offers = [];

const initialState = {
  offers,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
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
    case ActionType.LOAD_OFFERS:
      return extend(state, {
        offers: action.payload,
      });
  }
  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
