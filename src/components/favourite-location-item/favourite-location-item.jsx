import React from "react";
import PropTypes from "prop-types";
import {rating} from "../../utils.js";


const FavouriteLocationItem = (props) => {
  const {
    isPremium: isShowingPremium,
    previewImage,
    price,
    isFavourite: isShowingFavourite,
    grade,
    title,
    type,
  } = props;

  const favouruteClassActive = isShowingFavourite ? `place-card__bookmark-button--active` : ``;

  return (
    <article className="favorites__card place-card">

      {isShowingPremium && <div className="place-card__mark">
        <span>Premium</span>
      </div>}

      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image"/>
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${favouruteClassActive} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={rating(grade)}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

FavouriteLocationItem.propTypes = {
  isPremium: PropTypes.bool.isRequired,
  previewImage: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  grade: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};


export default FavouriteLocationItem;