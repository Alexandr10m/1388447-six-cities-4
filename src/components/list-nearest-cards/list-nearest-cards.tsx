import * as React from "react";
import CardNearest from "../card-nearest/card-nearest";
import {LocalOffer} from "../../types";


interface Props {
  offers: LocalOffer[];
}

const MAX_COUNT_NEAREST_OFFERS = 3;

const ListNearestCards: React.FunctionComponent<Props> = (props: Props) => {
  const {offers} = props;

  return (
    <div className="near-places__list places__list">
      {offers.map((offer, i) => {
        if (i > MAX_COUNT_NEAREST_OFFERS) {
          return false;
        }
        return (
          <CardNearest
            key={`${i}-${offer.title}`}
            offer={offer}

          />);
      })}
    </div>
  );
};


export default ListNearestCards;
