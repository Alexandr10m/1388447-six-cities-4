import React from "react";
import PropTypes from "prop-types";
import ListCards from "../list-cards/list-cards.jsx";
import Map from "../map/map.jsx";
import ListCities from "../list-cities/list-cities.jsx";


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
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex="0">
                  Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"/>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex="0">Popular</li>
                <li className="places__option" tabIndex="0">Price: low to high</li>
                <li className="places__option" tabIndex="0">Price: high to low</li>
                <li className="places__option" tabIndex="0">Top rated first</li>
              </ul>
              <select className="places__sorting-type" id="places-sorting" defaultValue={`popular`}>
                <option className="places__option" value="popular">Popular</option>
                <option className="places__option" value="to-high">Price: low to high</option>
                <option className="places__option" value="to-low">Price: high to low</option>
                <option className="places__option" value="top-rated">Top rated first</option>
              </select>
            </form>

            <ListCards
              localOffers={localOffers}
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
