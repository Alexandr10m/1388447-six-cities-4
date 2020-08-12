import * as React from "react";
import Map from "../map/map";
import SortComponent from "../sort/sort";
import withSelect from "../../hoc/with-select/with-select";
import ListCards from "../list-cards/list-cards";
import {CityOffers, LocalOffer} from "../../types";


interface Props {
  city: string;
  offers: CityOffers;
  activeCard: LocalOffer;
  onActiveCard: () => void;
}

const Sort = withSelect(SortComponent);

const MainOffers: React.FunctionComponent<Props> = (props: Props) => {
  const {
    city,
    offers,
    activeCard,
    onActiveCard,
  } = props;

  const {localOffers, cityCoords, cityZoom} = offers;
  const locationZoom = localOffers[0].locationZoom;


  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.localOffers.length} places to stay in {city}</b>
          <Sort/>
          <ListCards
            onActiveCard={onActiveCard}
          />

        </section>
        <div className="cities__right-section">
          <section className="cities__map map">

            <Map
              localOffers={localOffers}
              cityCoords={cityCoords}
              cityZoom={cityZoom}
              locationZoom={locationZoom}
              activeCard={activeCard}
            />

          </section>
        </div>
      </div>
    </div>
  );
};


export default MainOffers;
