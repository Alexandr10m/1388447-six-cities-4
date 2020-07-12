import React from "react";
import PropTypes from "prop-types";
import ListCities from "../list-cities/list-cities.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import MainOffers from "../main-offers/main-offers.jsx";
import Login from "../login/login.jsx";


const Main = (props) => {
  const {city, offers, onCardTitleClick, onCityClick} = props;
  const isEmptylocalOffers = offers.localOffers === null || offers.localOffers.length === 0;
  const EmptyMainPageClass = isEmptylocalOffers ? `page__main--index-empty` : ``;

  return (
    <div className="page page--gray page--main">
      <Login/>
      <main className={`page__main page__main--index ${EmptyMainPageClass}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <ListCities
              onCityClick={onCityClick}
              currentCity={city}
            />

          </section>
        </div>

        {isEmptylocalOffers ? <MainEmpty city={city}/>
          : <MainOffers
            city={city}
            offers={offers}
            onCardTitleClick={onCardTitleClick}
            onCityClick={onCityClick}
          />
        }

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
