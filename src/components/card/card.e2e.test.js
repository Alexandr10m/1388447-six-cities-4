import React from "react";
import {shallow} from "enzyme";
import Card from "./card.jsx";


const offer = {
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

describe(`E2E test of Card`, () => {
  it(`CardComponent title should pressed one time`, () => {
    const onCardTitleClick = jest.fn();
    const cardComponent = shallow(
        < Card
          offer={offer}
          onCardTitleClick={onCardTitleClick}
          onActiveCard={() => {}}
        />
    );

    const cardTitle = cardComponent.find(`h2.place-card__name`);
    cardTitle.simulate(`click`);

    expect(onCardTitleClick.mock.calls.length).toBe(1);
  });

  it(`Cursor hovering over the card by the user returns corresponding object`, () => {
    const onActiveCard = jest.fn((arg) => arg);
    const cardComponent = shallow(
        < Card
          offer={offer}
          onCardTitleClick={() => {}}
          onActiveCard={onActiveCard}
        />
    );

    const card = cardComponent.find(`article.place-card`);
    card.simulate(`mouseenter`);

    expect(onActiveCard.mock.calls.length).toBe(1);
    expect(onActiveCard.mock.calls[0][0]).toMatchObject(offer);
  });
});
