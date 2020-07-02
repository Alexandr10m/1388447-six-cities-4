import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {ListCards} from "./list-cards.jsx";
import {sortByType} from "../../utils.js";


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
  city: `Amsterdsam`,
  citycoords: [52.38333, 4.9],
  localOffers: [
    offerWithPremium,
    offerWithoutPremium,
    offerWithFavourite,
    offerWithoutFavourite
  ],
};


describe(`Snapshot of ListCards`, () => {
  it(`Card should render correctly Popular sort`, () => {
    const sortType = `Popular`;
    const store = mockStore({
      sortType,
      offers,
      localOffers: sortByType(sortType, offers.localOffers),
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <ListCards
              localOffers={offers.localOffers}
              onCardTitleClick={() => {}}
            />
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Card should render correctly Price: low to high sort`, () => {
    const sortType = `Price: low to high sort`;
    const store = mockStore({
      sortType,
      offers,
      localOffers: sortByType(sortType, offers.localOffers),
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <ListCards
              localOffers={offers.localOffers}
              onCardTitleClick={() => {}}
            />
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Card should render correctly Price: high to low sort`, () => {
    const sortType = `Price: high to low sort`;
    const store = mockStore({
      sortType,
      offers,
      localOffers: sortByType(sortType, offers.localOffers),
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <ListCards
              localOffers={offers.localOffers}
              onCardTitleClick={() => {}}
            />
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Card should render correctly - Top rated first sort`, () => {
    const sortType = `Top rated first sort`;
    const store = mockStore({
      sortType,
      offers,
      localOffers: sortByType(sortType, offers.localOffers),
    });

    const tree = renderer
      .create(
          <Provider store={store}>
            <ListCards
              localOffers={offers.localOffers}
              onCardTitleClick={() => {}}
            />
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
