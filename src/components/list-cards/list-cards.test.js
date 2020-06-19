import React from "react";
import renderer from "react-test-renderer";
import ListCards from "./list-cards.jsx";


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
          <ListCards
            offers={offers}
            onCardTitleClick={() => {}}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
