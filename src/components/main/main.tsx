import * as React from "react";
import PropTypes from "prop-types";
import ListCities from "../list-cities/list-cities.js";
import MainEmpty from "../main-empty/main-empty.jsx";
import MainOffersScreen from "../main-offers/main-offers.jsx";
import Login from "../login/login.js";
import {connect} from "react-redux";
import {getOffers, getCities} from "../../reducer/data/selectors.js";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {OfferPage} from "../offer-page/offer-page.jsx";
import {ActionCreator} from "../../reducer/state/state.js";
import withActiveCard from "../../hoc/with-active-card/with-active-card.js";


const MainOffers = withActiveCard(MainOffersScreen);

const Main = (props) => {
  const {match, offers, onCityClick, cities} = props;

  let {path, url} = useRouteMatch();
  const city = match.params.city;
  const showOffers = offers.find((it) => it.city === city);

  const isEmptylocalOffers = showOffers.localOffers === null || showOffers.localOffers.length === 0;
  const EmptyMainPageClass = isEmptylocalOffers ? `page__main--index-empty` : ``;

  return (
    <div className="page page--gray page--main">
      <Login/>
      <main className={`page__main page__main--index ${EmptyMainPageClass}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <ListCities
              cities={cities}
              currentCity={city}
              onCityClick={onCityClick}
            />

          </section>
        </div>

        {isEmptylocalOffers ? <MainEmpty city={city}/>
          : <MainOffers
            url={url}
            city={city}
            offers={showOffers}
          />
        }

      </main>
      <Switch>
        <Route exact path={`${path}/:offerId`} component={OfferPage}/>
      </Switch>
    </div>
  );
};


Main.propTypes = {
  match: PropTypes.object.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  cities: getCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => {
    dispatch(ActionCreator.changeCity(city));
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

