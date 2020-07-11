import {reducer, ActionType, ActionCreator} from "./state.js";


describe(`Test of reducer state.js with action`, () => {
  it(`reducer should change the city`, () => {
    const state = {
      city: `Amsterdam`,
      showedOffer: null,
    };

    const action = {
      type: ActionType.CHANGE_CITY,
      payload: `Paris`,
    };

    const newState = {
      city: `Paris`,
      showedOffer: null,
    };

    expect(reducer(state, action)).toEqual(newState);
  });

  it(`reducer should show the one offer`, () => {
    const state = {
      city: `Amsterdam`,
      showedOffer: null,
    };

    const action = {
      type: ActionType.SHOW_OFFER,
      payload: `hotel at the river`,
    };

    const newState = {
      city: `Amsterdam`,
      showedOffer: `hotel at the river`,
    };

    expect(reducer(state, action)).toEqual(newState);
  });

  it(`reducer should reset showedOffer`, () => {
    const state = {
      city: `Amsterdam`,
      showedOffer: `room at the moon`,
    };

    const action = {
      type: ActionType.RESET_SHOWED_OFFER,
      payload: null,
    };

    const newState = {
      city: `Amsterdam`,
      showedOffer: null,
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

  it(`Action creator for show offer return correct action`, () => {
    const conrrectAction = {
      type: ActionType.SHOW_OFFER,
      payload: `new offer`,
    };

    expect(ActionCreator.showOffer(`new offer`)).toEqual(conrrectAction);
  });

  it(`Action creator for reset showed offer return correct action`, () => {
    const conrrectAction = {
      type: ActionType.RESET_SHOWED_OFFER,
      payload: null,
    };

    expect(ActionCreator.resetShowedOffer()).toEqual(conrrectAction);
  });

  it(`Action creator for change sort return correct action`, () => {
    const conrrectAction = {
      type: ActionType.CHANGE_SORT,
      payload: `children`,
    };

    expect(ActionCreator.changeSort(`children`)).toEqual(conrrectAction);
  });
});
