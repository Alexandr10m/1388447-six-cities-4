import React from "react";
import PropTypes from "prop-types";
import {firstWordInUpper, rating} from "../../utils.js";
import ReviewList from "../review-list/review-list.jsx";
import Map from "../map/map.jsx";
import NearestCards from "../list-nearest-cards/list-nearest-cards.jsx";
import withActiveCard from "../../hoc/with-active-card/with-active-card.js";
import Host from "../host/host.jsx";
import Login from "../login/login.jsx";


const ListNearestCards = withActiveCard(NearestCards);


const propertyInsideItepTmpl = (item, index) => {
  return (
    <li key={item + index} className="property__inside-item">
      {item}
    </li>);
};

const propertyImageTmpl = (src, index) => {
  return (
    <div className="property__image-wrapper" key={src + index}>
      <img className="property__image" src={src} alt="Photo studio"/>
    </div>
  );
};

const OfferPage = (props) => {
  const {offers, offer, onCardTitleClick} = props;
  const {
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
    reviews,
    host,
    description,
    id,
  } = offer;

  const {localOffers, cityCoords, cityZoom} = offers;
  const {locationZoom} = localOffers.find((it) => it.locationZoom);
  const favouriteClass = isFavourite ? `property__bookmark-button--active` : ``;
  const nearestOffers = offers.localOffers.filter((it) => it !== offer);

  return (
    <div className="page">
      <Login/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {pictures.map((picture, i) => propertyImageTmpl(picture, i))}
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
                <button className={`property__bookmark-button ${favouriteClass} button`} type="button">
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
                  {facilities.map((item, i) => propertyInsideItepTmpl(item, i))}
                </ul>
              </div>
              <Host
                description={description}
                host={host}
              />
              <ReviewList
                reviews={reviews}
                offerId={id}
              />
            </div>
          </div>
          <section className="property__map map">
            <Map
              localOffers={nearestOffers}
              city={cityCoords}
              cityZoom={cityZoom}
              locationZoom={locationZoom}
            />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <ListNearestCards
              offers={nearestOffers}
              onCardTitleClick={onCardTitleClick}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

OfferPage.propTypes = {
  offers: PropTypes.object.isRequired,
  offer: PropTypes.shape({
    grade: PropTypes.number.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    isPremium: PropTypes.bool.isRequired,
    pictures: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    bedroom: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    facilities: PropTypes.array.isRequired,
    reviews: PropTypes.array.isRequired,
    id: PropTypes.number.isRequired,
    host: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
  }),
  onCardTitleClick: PropTypes.func.isRequired,
};

export default OfferPage;
