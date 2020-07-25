import React from "react";
import PropTypes from "prop-types";
import {firstWordInUpper, rating} from "../../utils.js";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Operation} from "../../reducer/data/data.js";
import {ActionCreator} from "../../reducer/state/state.js";


const Card = (props) => {
  const {offer, onCardMouseEnter, sendFavouriteOption} = props;
  const {
    grade,
    title,
    isPremium: isShowingPremium,
    price,
    isFavourite,
    type,
    className,
    previewImage,
    id: offerId
  } = offer;

  const tempPartClass = className || `cities__place-card`;
  const partClassName = (str) => str.split(`__`)[0];
  const favouriteClasse = isFavourite && `place-card__bookmark-button--active`;

  const handlerCardMouseEnter = () => {
    onCardMouseEnter(offer);
  };

  const handlerButtonFavouriteClick = () => {
    sendFavouriteOption({
      id: offer.id,
      status: +(!offer.isFavourite),
    });
  };

  return (
    <article
      className={`${tempPartClass} place-card`}
      onMouseEnter={handlerCardMouseEnter}
    >

      {isShowingPremium && <div className="place-card__mark">
        <span>Premium</span>
      </div>}

      <div className={`${partClassName(tempPartClass)}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offerId}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            onClick={handlerButtonFavouriteClick}
            className={`place-card__bookmark-button ${favouriteClasse} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={rating(grade)} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2
          className="place-card__name"
        >
          <Link to={`/offer/${offerId}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{firstWordInUpper(type)}</p>
      </div>
    </article>
  );
};


Card.propTypes = {
  sendFavouriteOption: PropTypes.func.isRequired,
  offer: PropTypes.shape({
    isPremium: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    grade: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    id: PropTypes.number.isRequired
  }),
  onCardMouseEnter: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  sendFavouriteOption(options) {
    dispatch(Operation.sendFavouriteOption(options));
  },

  onCardMouseEnter(offer) {
    dispatch(ActionCreator.showPoiner(offer));
  }
});

export {Card};
export default connect(null, mapDispatchToProps)(Card);
