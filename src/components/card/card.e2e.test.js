import React from "react";
import {shallow} from "enzyme";
import {Card} from "./card.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";


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
  title: `Penthouse, 4-5 rooms + 5 balconies`,
  type: `hotel`,
};

describe(`E2E test of Card`, () => {
  it(`Cursor hovering over the card by the user returns corresponding object`, () => {
    const onActiveCard = jest.fn((arg) => arg);
    const cardComponent = shallow(
        <Card
          offer={offer}
          sendFavouriteOption={() => {}}
          onActiveCard={onActiveCard}
          authorizationStatus={AuthorizationStatus.AUTH}
        />
    );

    const card = cardComponent.find(`article.place-card`);
    card.simulate(`mouseenter`);

    expect(onActiveCard.mock.calls.length).toBe(1);
    expect(onActiveCard.mock.calls[0][0]).toMatchObject(offer);
  });

  it(`Button of CardComponent shout pressed one time`, () => {
    const sendFavouriteOption = jest.fn();
    const cardComponent = shallow(
        <Card
          offer={offer}
          sendFavouriteOption={sendFavouriteOption}
          onActiveCard={() => {}}
          authorizationStatus={AuthorizationStatus.AUTH}
        />
    );

    const button = cardComponent.find(`button.place-card__bookmark-button`);
    button.simulate(`click`);

    expect(sendFavouriteOption.mock.calls.length).toBe(1);
  });

  it(`Button of CardComponent shout`, () => {
    const sendFavouriteOption = jest.fn();
    const cardComponent = shallow(
        <Card
          offer={offer}
          sendFavouriteOption={sendFavouriteOption}
          onActiveCard={() => {}}
          authorizationStatus={AuthorizationStatus.AUTH}
        />
    );

    const button = cardComponent.find(`button.place-card__bookmark-button`);
    button.simulate(`click`);

    expect(sendFavouriteOption.mock.calls[0][0]).toMatchObject({
      id: offer.id,
      status: +(!offer.isFavourite)
    });
  });
});
