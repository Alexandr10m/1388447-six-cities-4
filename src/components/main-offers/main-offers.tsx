import * as React from "react";
import PropTypes from "prop-types";
import Map from "../map/map.jsx";
import SortComponent from "../sort/sort.jsx";
import withSelect from "../../hoc/with-select/with-select.js";
import ListCards from "../list-cards/list-cards.js";


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

MainOffers.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.shape({
    city: PropTypes.string.isRequired,
    cityCoords: PropTypes.arrayOf(PropTypes.number).isRequired,
    cityZoom: PropTypes.number,
    localOffers: PropTypes.arrayOf(PropTypes.shape({
      isPremium: PropTypes.bool.isRequired,
      pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.number.isRequired,
      isFavourite: PropTypes.bool.isRequired,
      grade: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      bedroom: PropTypes.number.isRequired,
      maxAdults: PropTypes.number.isRequired,
      facilities: PropTypes.arrayOf(PropTypes.string).isRequired,
      coords: PropTypes.arrayOf(PropTypes.number).isRequired,
      locationZoom: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      previewImage: PropTypes.string.isRequired,
      host: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        isPro: PropTypes.bool.isRequired,
        avatarUrl: PropTypes.string.isRequired,
      }).isRequired,
    })),
  }),
  activeCard: PropTypes.shape({
    isPremium: PropTypes.bool.isRequired,
    pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    grade: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    bedroom: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    facilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
    locationZoom: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    host: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isPro: PropTypes.bool.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
  }),
  onActiveCard: PropTypes.func.isRequired,
};

export default MainOffers;
