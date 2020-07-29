import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {firstWordInUpper, rating} from "../../utils.js";
import ReviewList from "../review-list/review-list.jsx";
import Map from "../map/map.jsx";
import ListNearestCards from "../list-nearest-cards/list-nearest-cards.jsx";
import Host from "../host/host.jsx";
import Login from "../login/login.jsx";
import {connect} from "react-redux";
import {getCity} from "../../reducer/state/selector.js";
import {getOffers, getNearbyOffers, getLoadingNearbyOffersInProgress} from "../../reducer/data/selectors.js";
import {Operation} from "../../reducer/data/data.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import history from "../../history.js";
import {AppRoute} from "../../constants.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import Preload from "../preload/preload.jsx";
import {getReviews, getLoadingReviewsInProgress} from "../../reducer/data/selectors.js";


class OfferPage extends PureComponent {
  constructor(props) {
    super(props);

    this._offerId = null;
    this._isFavourite = null;

    this._handlerButtonFavouriteClick = this._handlerButtonFavouriteClick.bind(this);
  }

  componentDidMount() {
    const {loadReviews, loadNearbyOffers, match} = this.props;
    const offerId = +match.params.offerId;

    loadReviews(offerId);
    loadNearbyOffers(offerId);
  }

  _handlerButtonFavouriteClick() {
    const {sendFavouriteOption, authorizationStatus} = this.props;

    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.LOGIN);
      return;
    }
    sendFavouriteOption({
      id: this._offerId,
      status: +(!this._isFavourite),
    });
  }

  _showPreload() {
    return <Preload/>;
  }

  _showOffer() {
    const {match, offers, nearbyOffers, reviews} = this.props;

    this._offerId = +match.params.offerId;

    const currentCityOffers = offers.find((city) => {
      return city.localOffers.some((offer) => offer.id === this._offerId);
    });

    const {localOffers, cityCoords, cityZoom} = currentCityOffers;
    const currentOffer = localOffers.find((offer) => offer.id === this._offerId);

    const {
      locationZoom,
      grade,
      isFavourite,
      isPremium: isShowingPrimium,
      pictures,
      price,
      title,
      type,
      bedroom,
      maxAdults,
      facilities,
      host,
      description,
    } = currentOffer;
    this._isFavourite = isFavourite;

    const offersForMap = [...nearbyOffers, currentOffer];

    const favouriteClass = isFavourite ? `property__bookmark-button--active` : ``;

    return (
      <div className="page">
        <Login/>
        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">

                {pictures.map((picture, i) => {
                  if (i <= 5) {
                    return (
                      <div className="property__image-wrapper" key={picture + i}>
                        <img className="property__image" src={picture} alt="Photo studio"/>
                      </div>
                    );
                  }
                  return false;
                })}

              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {isShowingPrimium && <div className="property__mark">
                  <span>Premium</span>
                </div>}
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  <button
                    onClick={this._handlerButtonFavouriteClick}
                    className={`property__bookmark-button ${favouriteClass} button`}
                    type="button"
                  >
                    <svg className="place-card__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={rating(grade)}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{grade}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {firstWordInUpper(type)}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedroom} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">

                    {facilities.map((item, i) => {
                      return (
                        <li key={item + i} className="property__inside-item">
                          {item}
                        </li>);
                    })}

                  </ul>
                </div>
                <Host
                  description={description}
                  host={host}
                />
                <ReviewList
                  reviews={reviews}
                  offerId={this._offerId}
                />
              </div>
            </div>
            <section className="property__map map">
              <Map
                localOffers={offersForMap}
                city={cityCoords}
                cityZoom={cityZoom}
                locationZoom={locationZoom}
                activeCard={currentOffer}
              />
            </section>
          </section>

          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <ListNearestCards
                offers={nearbyOffers}
              />
            </section>
          </div>
        </main>
      </div>
    );
  }

  render() {
    const {isLoadingReviews, isLoadingNearbyOffers} = this.props;

    if (isLoadingNearbyOffers || isLoadingReviews) {
      return this._showPreload();
    }

    return this._showOffer();
  }
}

OfferPage.propTypes = {
  match: PropTypes.object.isRequired,
  offers: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  nearbyOffers: PropTypes.array.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  sendFavouriteOption: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
  loadNearbyOffers: PropTypes.func.isRequired,
  isLoadingNearbyOffers: PropTypes.bool.isRequired,
  isLoadingReviews: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
  city: getCity(state),
  offers: getOffers(state),
  authorizationStatus: getAuthorizationStatus(state),
  reviews: getReviews(state),
  nearbyOffers: getNearbyOffers(state),
  isLoadingReviews: getLoadingReviewsInProgress(state),
  isLoadingNearbyOffers: getLoadingNearbyOffersInProgress(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendFavouriteOption(options) {
    dispatch(Operation.sendFavouriteOption(options));
  },
  loadReviews(offerId) {
    dispatch(Operation.loadReviews(offerId));
  },
  loadNearbyOffers(offerId) {
    dispatch(Operation.loadNearbyOffers(offerId));
  }
});

export {OfferPage};
export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
