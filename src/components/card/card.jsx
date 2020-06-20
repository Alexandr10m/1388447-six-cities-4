import React from "react";
import PropTypes from "prop-types";
import {firstWordInUpper, rating} from "../../utils.js";


const Card = (props) => {
  const {offer, onCardTitleClick, onActiveCard} = props;
  const {
    grade,
    title,
    isPremium: isShowingPremium,
    pictures, price, isFavourite,
    type
  } = offer;
  const firstPicture = pictures[0];
  const favouriteClasse = isFavourite ? `place-card__bookmark-button--active` : ``;
  const handlerCardMouseEnter = () => {
    onActiveCard(offer);
  };

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={handlerCardMouseEnter}
    >

      {isShowingPremium ? <div className="place-card__mark">
        <span>Premium</span>
      </div> : ``}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={firstPicture} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
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
          onClick={onCardTitleClick}
          className="place-card__name"
        >
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{firstWordInUpper(type)}</p>
      </div>
    </article>
  );
};


Card.propTypes = {
  offer: PropTypes.shape({
    isPremium: PropTypes.bool.isRequired,
    pictures: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    isFavourite: PropTypes.bool.isRequired,
    grade: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  onCardTitleClick: PropTypes.func.isRequired,
  onActiveCard: PropTypes.func.isRequired,
};


export default Card;
