import React from "react";
import renderer from "react-test-renderer";
import OfferPage from "./offer-page.jsx";


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
};

const offers = [
  offerWithPremium,
  offerWithoutPremium,
  offerWithFavourite,
  offerWithoutFavourite
];


describe(`Snapshot of OfferPage`, () => {
  it(`OfferPage should render whit Premium`, () => {
    const tree = renderer
      .create(
          <OfferPage
            offer={offers[0]}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`OfferPage should render whitout Premium`, () => {
    const tree = renderer
      .create(
          <OfferPage
            offer={offers[1]}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`OfferPage should render whit Favourite`, () => {
    const tree = renderer
      .create(
          <OfferPage
            offer={offers[2]}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`OfferPage should render whitout Favourite`, () => {
    const tree = renderer
      .create(
          <OfferPage
            offer={offers[3]}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
