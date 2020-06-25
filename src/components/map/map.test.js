import React from "react";
import renderer from "react-test-renderer";
import Map from "./map.jsx";


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
  coords: [52.3909553943508, 4.929309666406198],
};

const offerWithFavourite = {
  isPremium: true,
  pictures: [`picture`],
  price: 100,
  isFavourite: true,
  grade: 4,
  title: `title`,
  type: `Hotel`,
  coords: [52.369553943508, 4.85309666406198],
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

describe(`Snapshot of Map`, () => {
  it(`Map should render correctly`, () => {
    jest.mock(`leaflet`);

    const tree = renderer
      .create(
          <Map
            offers={offers}
          />, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
