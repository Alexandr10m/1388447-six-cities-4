import React from "react";
import PropTypes from "prop-types";
import ListCities from "../list-cities/list-cities.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import MainOffers from "../main-offers/main-offers.jsx";


const Main = (props) => {
  const {city, offers, onCardTitleClick, onCityClick} = props;
  const isEmptyOffers = !!offers.localOffers.length;
  const EmptyMainClass = isEmptyOffers ? `page__main--index-empty` : ``;

  return (
    <div className="page page--gray page--main">
      <main className={`page__main page__main--index ${EmptyMainClass}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <ListCities
              onCityClick={onCityClick}
              currentCity={city}
            />

          </section>
        </div>
        {isEmptyOffers ? <MainOffers city={city} offers={offers} onCardTitleClick={onCardTitleClick} onCityClick={onCityClick}/> : <MainEmpty city={city}/>}
      </main>
    </div>
  );
};


Main.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.object.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
};


export default Main;
