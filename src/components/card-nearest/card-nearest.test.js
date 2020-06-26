import React from "react";
import renderer from "react-test-renderer";
import CardNearest from "./card-nearest.jsx";


const offerWithPremium = {
  isPremium: true,
  pictures: [`picture`],
  price: 100,
  isFavourite: false,
  grade: 4,
  title: `title`,
  type: `Hotel`,
};

const offerWithoutPremium = {
  isPremium: true,
  pictures: [`picture`],
  price: 100,
  isFavourite: false,
  grade: 4,
  title: `title`,
  type: `Hotel`,
};

const offerWithFavourite = {
  isPremium: true,
  pictures: [`picture`],
  price: 100,
  isFavourite: true,
  grade: 4,
  title: `title`,
  type: `Hotel`,
};

const offerWithoutFavourite = {
  isPremium: true,
  pictures: [`picture`],
  price: 100,
  isFavourite: false,
  grade: 4,
  title: `title`,
  type: `Hotel`,
};

describe(`Snapshot of Card`, () => {
  it(`Card should render correctly with Primium`, () => {
    const tree = renderer
      .create(
          <CardNearest
            offer={offerWithPremium}
            onCardTitleClick={() => {}}
            onActiveCard={() => {}}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Card should render correctly without Primium`, () => {
    const tree = renderer
      .create(
          <CardNearest
            offer={offerWithoutPremium}
            onCardTitleClick={() => {}}
            onActiveCard={() => {}}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Card should render correctly with FavouriteClass`, () => {
    const tree = renderer
      .create(
          <CardNearest
            offer={offerWithFavourite}
            onCardTitleClick={() => {}}
            onActiveCard={() => {}}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Card should render correctly without FavouriteClass`, () => {
    const tree = renderer
      .create(
          <CardNearest
            offer={offerWithoutFavourite}
            onCardTitleClick={() => {}}
            onActiveCard={() => {}}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
