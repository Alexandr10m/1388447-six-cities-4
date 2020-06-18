import React from "react";
import renderer from "react-test-renderer";
import Card from "./card.jsx";


const offerWithPremium = {
  isPremium: true,
  picture: `picture`,
  price: 100,
  isFavourite: false,
  grade: 4,
  title: `title`,
  type: `Hotel`,
};

const offerWithoutPremium = {
  isPremium: true,
  picture: `picture`,
  price: 100,
  isFavourite: false,
  grade: 4,
  title: `title`,
  type: `Hotel`,
};

const offerWithFavourite = {
  isPremium: true,
  picture: `picture`,
  price: 100,
  isFavourite: true,
  grade: 4,
  title: `title`,
  type: `Hotel`,
};

const offerWithoutFavourite = {
  isPremium: true,
  picture: `picture`,
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
          <Card
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
          <Card
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
          <Card
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
          <Card
            offer={offerWithoutFavourite}
            onCardTitleClick={() => {}}
            onActiveCard={() => {}}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
