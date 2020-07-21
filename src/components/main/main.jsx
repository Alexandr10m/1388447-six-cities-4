import React from "react";
import PropTypes from "prop-types";
import ListCities from "../list-cities/list-cities.jsx";
import MainEmpty from "../main-empty/main-empty.jsx";
import MainOffers from "../main-offers/main-offers.jsx";
import Login from "../login/login.jsx";
import {connect} from "react-redux";
import {getOffers} from "../../reducer/data/selectors.js";
import {ActionCreator} from "../../reducer/state/state.js";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {OfferPage} from "../offer-page/offer-page.jsx";


const Main = (props) => {
  const {match, offers, onCardTitleClick, onCityClick} = props;
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
              onCityClick={onCityClick}
              currentCity={city}
            />

          </section>
        </div>

        {isEmptylocalOffers ? <MainEmpty city={city}/>
          : <MainOffers
            url={url}
            city={city}
            offers={showOffers}
            onCardTitleClick={onCardTitleClick}
            onCityClick={onCityClick}
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
  offers: PropTypes.array.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCardTitleClick(offer) {
    dispatch(ActionCreator.showOffer(offer));
  },
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.resetShowedOffer());
  },
});


export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);

