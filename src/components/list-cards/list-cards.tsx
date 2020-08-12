import * as React from "react";
import Card from "../card/card";
import {connect} from "react-redux";
import {getLocalOffers} from "../../reducer/state/selector";
import {LocalOffer} from "../../types";


interface Props {
  localOffers: LocalOffer[];
  onActiveCard: () => void;
}

const ListCards: React.FunctionComponent<Props> = (props: Props) => {

  const {
    localOffers,
    onActiveCard,
  } = props;

  return (
    <div className="cities__places-list places__list tabs__content">

      {localOffers.map((offer, i) => {
        return <Card
          key={`${i}-${offer.id}`}
          offer={offer}
          onActiveCard={onActiveCard}
        />;
      })}

    </div>
  );
};

const mapStateToProps = (state) => ({
  localOffers: getLocalOffers(state),
});


export {ListCards};
export default connect(mapStateToProps)(ListCards);
