import * as React from "react";
import {rating} from "../../utils";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Operation} from "../../reducer/data/data";
import {LocalOffer} from "../../types";


interface Props {
  sendFavouriteOption: ({id, status}: {id: number; status: number}) => void;
  offer: LocalOffer;
}

const FavouriteLocationItem: React.FunctionComponent<Props> = (props: Props) => {
  const {offer} = props;
  const {
    isPremium: isShowingPremium,
    previewImage,
    price,
    isFavourite,
    grade,
    title,
    type,
    id: offerId,
  } = offer;

  const isShowingFavourite = isFavourite;
  const favouruteClassActive = isShowingFavourite ? `place-card__bookmark-button--active` : ``;

  const handlerButtonFavouriteClick = () => {
    const {sendFavouriteOption} = props;
    sendFavouriteOption({
      id: offerId,
      status: +(!isFavourite),
    });
  };

  return (
    <article className="favorites__card place-card">

      {isShowingPremium && <div className="place-card__mark">
        <span>Premium</span>
      </div>}

      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link
          to={`/offer/${offerId}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button onClick={handlerButtonFavouriteClick}
            className={`place-card__bookmark-button ${favouruteClassActive} button`} type="button">
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
          <Link
            to={`/offer/${offerId}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

const mapDispatchToProps = (dispatch) => ({
  sendFavouriteOption(options) {
    dispatch(Operation.sendFavouriteOption(options));
  }
});


export {FavouriteLocationItem};
export default connect(null, mapDispatchToProps)(FavouriteLocationItem);

