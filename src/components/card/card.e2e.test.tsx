import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import {configure, shallow} from "enzyme";
import {Card} from "./card";
import {AuthorizationStatus} from "../../reducer/user/user";
import {LocalOffer} from "../../types";
import {noop} from "../../utils";


configure({adapter: new Adapter()});

const offer: LocalOffer = {
  bedroom: 2,
  coords: [48.865610000000004, 2.350499],
  description: `in city center.`,
  facilities: [`Air conditioning`, `Breakfast`],
  grade: 3.6,
  host: {
    avatarUrl: `img/avatar-angelina.jpg`,
    id: 25,
    isPro: true,
    name: `Angelina`,
  },
  id: 1,
  isFavourite: false,
  isPremium: true,
  locationZoom: 16,
  maxAdults: 8,
  pictures: [`https://`, `https`],
  previewImage: `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/5.jpg`,
  price: 397,
  title: `Penthouse`,
  type: `hotel`,
};

describe(`E2E test of Card`, () => {
  it(`Cursor hovering over the card by the user returns corresponding object`, () => {
    const onActiveCard = jest.fn((arg) => arg);
    const cardComponent = shallow(
        <Card
          offer={offer}
          sendFavouriteOption={noop}
          onActiveCard={onActiveCard}
          authorizationStatus={AuthorizationStatus.AUTH}
          className={undefined}
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
          onActiveCard={noop}
          authorizationStatus={AuthorizationStatus.AUTH}
          className={undefined}
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
          onActiveCard={noop}
          authorizationStatus={AuthorizationStatus.AUTH}
          className={undefined}
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
