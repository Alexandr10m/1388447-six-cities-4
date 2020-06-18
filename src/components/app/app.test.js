import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";


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

const props = {
  offers
};


describe(`Snapshot of App`, () => {
  it(`AppComponent should render`, () => {
    const tree = renderer
      .create(
          <App
            {...props}
          />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
