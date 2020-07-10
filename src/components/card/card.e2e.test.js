import React from "react";
import {shallow} from "enzyme";
import Card from "./card.jsx";


const offer = {
  bedroom: 2,
  coords: [48.865610000000004, 2.350499],
  description: `Discover daily local life in city center.`,
  facilities: [`Air conditioning`, `Breakfast`],
  grade: 3.6,
  host: {
    avatarUrl: `img/avatar-angelina.jpg`,
    id: 25,
    isPro: true,
    name: `Angelina`,
  },
  id: 0,
  isFavourite: false,
  isPremium: true,
  locationZoom: 16,
  maxAdults: 8,
  pictures: [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`],
  previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
  price: 397,
  reviews: [{
    image: `img/avatar-max.jpg`,
    text: `A quiet cozy and picturesque.`,
    name: `Max`,
    time: `April 2019`
  }],
  title: `Penthouse, 4-5 rooms + 5 balconies`,
  type: `hotel`,
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
