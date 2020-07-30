import {reducer, ActionType, ActionCreator} from "./state.js";


describe(`Test of reducer state.js with action`, () => {
  it(`reducer should change the city`, () => {
    const state = {
      city: `Amsterdam`,
    };

    const action = {
      type: ActionType.CHANGE_CITY,
      payload: `Paris`,
    };

    const newState = {
      city: `Paris`,
    };

    expect(reducer(state, action)).toEqual(newState);
  });

  it(`reducer should change sort`, () => {
    const state = {
      sortType: `man`,
    };

    const action = {
      type: ActionType.CHANGE_SORT,
      payload: `woman`,
    };

    const newState = {
      sortType: `woman`,
    };

    expect(reducer(state, action)).toEqual(newState);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for change city return correct action`, () => {
    const conrrectAction = {
      type: ActionType.CHANGE_CITY,
      payload: `Paris`,
    };

    expect(ActionCreator.changeCity(`Paris`)).toEqual(conrrectAction);
  });

  it(`Action creator for change sort return correct action`, () => {
    const conrrectAction = {
      type: ActionType.CHANGE_SORT,
      payload: `children`,
    };

    expect(ActionCreator.changeSort(`children`)).toEqual(conrrectAction);
  });
});
