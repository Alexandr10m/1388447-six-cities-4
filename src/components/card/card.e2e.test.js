import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "./card.jsx";


Enzyme.configure({
  adapter: new Adapter()
});

describe(`E2E test of Card`, () => {
  it(`CardComponent title should pressed one time`, () => {
    const onCardTitleClick = jest.fn();

    const cardComponent = shallow(
        < Card
          offerName={`Wood and stone place`}
          grade={80}
          onCardTitleClick={onCardTitleClick}
        />
    );

    const cardTitle = cardComponent.find(`h2.place-card__name`);
    cardTitle.simulate(`click`);

    expect(onCardTitleClick.mock.calls.length).toBe(1);
  });
});
