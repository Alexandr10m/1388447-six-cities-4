import React from "react";
import Review from "../review/review.jsx";
import PropTypes from "prop-types";

const RatingText = [`terribly`, `badly`, `not bad`, `good`, `perfect`];

const inputStarTmpl = () => {
  const rating = [];

  for (let i = 5; i > 0; i--) {
    rating.push(
        <React.Fragment key={i}>
          <input className="form__rating-input visually-hidden" name="rating" value={i} id={`${i}-stars`} type="radio"/>
          <label htmlFor={`${i}-stars`} className="reviews__rating-label form__rating-label" title={RatingText[i - 1]}>
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"/>
            </svg>
          </label>
        </React.Fragment>
    );
  }

  return rating;
};


const ReviewList = (props) => {
  const {reviews} = props;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{111111111111111}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) =>{
          return <Review
            key={(new Date() + 1).toString()}
            review={review}
          />;
        })}

      </ul>
      <form className="reviews__form form" action="#" method="post">
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {inputStarTmpl()}
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
        </div>
      </form>
    </section>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};


export default ReviewList;
