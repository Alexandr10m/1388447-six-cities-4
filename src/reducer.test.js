import {reducer, ActionType, ActionCreator} from "./reducer.js";

const offerWithPremium = {
  isPremium: true,
  pictures: [`picture`],
  price: 100,
  isFavourite: false,
  grade: 4,
  title: `title`,
  type: `Hotel`,
  bedroom: 1,
  maxAdults: 1,
  facilities: [`Wi-Fi`, `Heating`, `Kitchen`],
  coords: [52.3909553943508, 4.85309666406198],
  id: `1111`,
  reviews: [{
    image: `img/avatar-max.jpg`,
    text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    name: `Max`,
    time: `April 2019`,
  }],
};

const offers = {
  city: `Amsterdam`,
  cityCoords: [52.38333, 4.9],
  localOffers: [
    offerWithPremium,
  ],
};


describe(`Test of work functcion reducer with action`, () => {
  it(`reducer should change the city`, () => {
    const state = {
      city: `Amsterdam`,
      offers,
      showedOffer: null,
    };

    const action = {
      type: ActionType.CHANGE_CITY,
      payload: `Paris`,
    };

    const newState = {
      city: `Paris`,
      offers,
      showedOffer: null,
    };

    expect(reducer(state, action)).toEqual(newState);
  });

  it(`reducer should change the offers`, () => {
    const state = {
      city: `Amsterdam`,
      offers,
      showedOffer: null,
    };

    const action = {
      type: ActionType.CHANGE_LOCAL_OFFERS,
      payload: `new Offers`,
    };

    const newState = {
      city: `Amsterdam`,
      offers: `new Offers`,
      showedOffer: null,
    };

    expect(reducer(state, action)).toEqual(newState);
  });

  it(`reducer should show the one offer`, () => {
    const state = {
      city: `Amsterdam`,
      offers,
      showedOffer: null,
    };

    const action = {
      type: ActionType.SHOW_OFFER,
      payload: `hotel at the river`,
    };

    const newState = {
      city: `Amsterdam`,
      offers,
      showedOffer: `hotel at the river`,
    };

    expect(reducer(state, action)).toEqual(newState);
  });

  it(`reducer should reset showedOffer`, () => {
    const state = {
      city: `Amsterdam`,
      offers,
      showedOffer: `room at the moon`,
    };

    const action = {
      type: ActionType.RESET_SHOWED_OFFER,
      payload: null,
    };

    const newState = {
      city: `Amsterdam`,
      offers,
      showedOffer: null,
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
});
