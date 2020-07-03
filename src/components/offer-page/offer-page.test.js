import React from "react";
import renderer from "react-test-renderer";
import OfferPage from "./offer-page.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

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
const offerWithoutPremium = {
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
  id: `111`,
  reviews: [{
    image: `img/avatar-max.jpg`,
    text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    name: `Max`,
    time: `April 2019`,
  }],
};
const offerWithFavourite = {
  isPremium: true,
  pictures: [`picture`],
  price: 100,
  isFavourite: true,
  grade: 4,
  title: `title`,
  type: `Hotel`,
  bedroom: 1,
  maxAdults: 1,
  facilities: [`Wi-Fi`, `Heating`, `Kitchen`],
  coords: [52.3909553943508, 4.85309666406198],
  id: `11`,
  reviews: [{
    image: `img/avatar-max.jpg`,
    text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    name: `Max`,
    time: `April 2019`,
  }],
};
const offerWithoutFavourite = {
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
  id: `1`,
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
    offerWithoutPremium,
    offerWithFavourite,
    offerWithoutFavourite
  ],
};


const props = {
  offers,
  onCardTitleClick: ()=>{},
};

const store = mockStore({});

describe(`Snapshot of OfferPage`, () => {
  it(`OfferPage should render whit Premium`, () => {
    const tree = renderer
      .create(
          <Provider store={store}>
            <OfferPage
              {...props}
              offer={offerWithPremium}
            />
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`OfferPage should render whitout Premium`, () => {
    const tree = renderer
      .create(
          <Provider store={store}>
            <OfferPage
              {...props}
              offer={offerWithoutPremium}
            />
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`OfferPage should render whit Favourite`, () => {
    const tree = renderer
      .create(
          <Provider store={store}>
            <OfferPage
              {...props}
              offer={offerWithFavourite}
            />
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`OfferPage should render whitout Favourite`, () => {
    const tree = renderer
      .create(
          <Provider store={store}>
            <OfferPage
              {...props}
              offer={offerWithoutFavourite}
            />
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
