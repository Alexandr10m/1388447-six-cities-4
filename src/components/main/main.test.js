import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";


const offerWithPremium = {
  isPremium: true,
  pictures: [`picture`],
  price: 100,
  isFavourite: false,
  grade: 4,
  title: `title`,
  type: `Hotel`,
  coords: [52.3909553943508, 4.85309666406198],
};

const offerWithoutPremium = {
  isPremium: true,
  pictures: [`picture`],
  price: 100,
  isFavourite: false,
  grade: 4,
  title: `title`,
  type: `Hotel`,
  coords: [52.3909553943508, 4.85309666406198],
};

const offerWithFavourite = {
  isPremium: true,
  pictures: [`picture`],
  price: 100,
  isFavourite: true,
  grade: 4,
  title: `title`,
  type: `Hotel`,
  coords: [52.3909553943508, 4.85309666406198],
};

const offerWithoutFavourite = {
  isPremium: true,
  pictures: [`picture`],
  price: 100,
  isFavourite: false,
  grade: 4,
  title: `title`,
  type: `Hotel`,
  coords: [52.3909553943508, 4.85309666406198],
};

const offers = [
  offerWithPremium,
  offerWithoutPremium,
  offerWithFavourite,
  offerWithoutFavourite
];


describe(`Snapshot of Main`, () => {
  it(`MainComponent should render`, () => {
    const tree = renderer
      .create(
          <Main
            offers={offers}
            onCardTitleClick={() => {}}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
