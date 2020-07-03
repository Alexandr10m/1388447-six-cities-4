import React from "react";
import PropTypes from "prop-types";
import ListCards from "../list-cards/list-cards.jsx";
import Map from "../map/map.jsx";
import ListCities from "../list-cities/list-cities.jsx";
import Sort from "../sort/sort.jsx";


const Main = (props) => {
  const {city, offers, onCardTitleClick, onCityClick} = props;
  const localOffers = offers.localOffers;
  const cityCoords = offers.cityCoords;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">

          <ListCities
            onCityClick={onCityClick}
            currentCity={city}
          />

        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.localOffers.length} places to stay in {city}</b>
            <Sort/>
            <ListCards
              onCardTitleClick={onCardTitleClick}
            />

          </section>
          <div className="cities__right-section">
            <section className="cities__map map">

              <Map
                localOffers={localOffers}
                city={cityCoords}
              />

            </section>
          </div>
        </div>
      </div>
    </main>
  );
};


Main.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.object.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
};


export default Main;
