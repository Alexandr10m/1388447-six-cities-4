import * as React from "react";
import ListCities from "../list-cities/list-cities";
import MainEmpty from "../main-empty/main-empty";
import MainOffersScreen from "../main-offers/main-offers";
import Login from "../login/login";
import {connect} from "react-redux";
import {getOffers, getCities} from "../../reducer/data/selectors";
import {Route, Switch, useRouteMatch, RouteProps} from "react-router-dom";
import {OfferPage} from "../offer-page/offer-page";
import {ActionCreator} from "../../reducer/state/state";
import withActiveCard from "../../hoc/with-active-card/with-active-card";
import {CityOffers} from "../../types";


type Props = RouteProps & {
  offers: CityOffers[];
  cities: string[];
  onCityClick: () => void;
}

const MainOffers = withActiveCard(MainOffersScreen);

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {
    match,
    offers,
    onCityClick,
    cities,
  } = props;

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
