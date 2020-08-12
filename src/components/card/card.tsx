import * as React from "react";
import {firstWordInUpper, rating} from "../../utils";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {Operation} from "../../reducer/data/data";
import history from "../../history";
import {AppRoute} from "../../constants";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {AuthorizationStatus} from "../../reducer/user/user";
import {LocalOffer} from "../../types";


interface Props {
  offer: LocalOffer;
  onActiveCard: (offer: LocalOffer) => void;
  sendFavouriteOption: ({id, status}: {id: number; status: number}) => void;
  authorizationStatus: string;
  className: string | undefined;
}

const Card: React.FunctionComponent<Props> = (props: Props) => {
  const {
    offer,
    onActiveCard,
    sendFavouriteOption,
    authorizationStatus,
    className,
  } = props;

  const {
    grade,
    title,
    isPremium: isShowingPremium,
    price,
    isFavourite,
    type,
    previewImage,
    id,
  } = offer;

  const offerId = id;
  const tempPartClass = className || `cities__place-card`;
  const partClassName = (str) => str.split(`__`)[0];
  const favouriteClasse = isFavourite && `place-card__bookmark-button--active`;

  const handlerCardMouseEnter = () => {
    if (onActiveCard) {
      onActiveCard(offer);
    }
  };

  const handlerButtonFavouriteClick = () => {
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.LOGIN);
      return;
    }
    sendFavouriteOption({
      id,
      status: +(!isFavourite),
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

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  sendFavouriteOption(options) {
    dispatch(Operation.sendFavouriteOption(options));
  },
});


export {Card};
export default connect(mapStateToProps, mapDispatchToProps)(Card);
