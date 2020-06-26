import React from "react";
import renderer from "react-test-renderer";
import ListNearestCards from "./list-nearest-cards.jsx";


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

const offers = [
  offerWithPremium,
  offerWithoutPremium,
  offerWithFavourite,
  offerWithoutFavourite
];


describe(`Snapshot of ListCards`, () => {
  it(`Card should render correctly with Primium`, () => {
    const tree = renderer
      .create(
          <ListNearestCards
            offers={offers}
            onCardTitleClick={() => {}}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
