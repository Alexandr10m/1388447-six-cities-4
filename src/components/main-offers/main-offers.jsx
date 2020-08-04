import React from "react";
import PropTypes from "prop-types";
import Map from "../map/map.jsx";
import SortComponent from "../sort/sort.jsx";
import withSelect from "../../hoc/with-select/with-select.js";
import ListCards from "../list-cards/list-cards.jsx";


const Sort = withSelect(SortComponent);
const MainOffers = (props) => {
  const {city, offers, onActiveCard, activeCard} = props;
  const {localOffers, cityCoords, cityZoom} = offers;
  const {locationZoom} = localOffers.find((it) => it.locationZoom);


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
              city={cityCoords}
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

MainOffers.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.object.isRequired,
  activeCard: PropTypes.object,
  onActiveCard: PropTypes.func.isRequired,
};

export default MainOffers;
