import React from "react";
import PropTypes from "prop-types";
import Map from "../map/map.jsx";
import Sort from "../sort/sort.jsx";
import ListCards from "../list-cards/list-cards.jsx";

const MainOffers = (props) => {
  const {city, offers} = props;
  const {localOffers, cityCoords, cityZoom} = offers;
  const {locationZoom} = localOffers.find((it) => it.locationZoom);


  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.localOffers.length} places to stay in {city}</b>
          <Sort/>
          <ListCards/>

        </section>
        <div className="cities__right-section">
          <section className="cities__map map">

            <Map
              localOffers={localOffers}
              city={cityCoords}
              cityZoom={cityZoom}
              locationZoom={locationZoom}
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
};

export default MainOffers;
