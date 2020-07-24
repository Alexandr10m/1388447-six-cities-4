import {extend} from "../../utils.js";


const initialState = {
  city: `Paris`,
  sortType: `Popular`,
  indicatedCard: {},
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT: `CHANGE_SORT`,
  SHOW_POINTER: `SHOW_POINTER`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
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
