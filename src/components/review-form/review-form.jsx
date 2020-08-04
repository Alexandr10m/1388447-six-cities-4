import PropTypes from "prop-types";
import React from "react";

const ReviewForm = (props) => {

  const _handleSubmit = (evt) => {
    evt.preventDefault();
    const {onSubmit, offerId} = props;

    onSubmit(offerId);
  };

  const {
    children,
    commentText,
    buttonDisable,
    isValidText,
    isValidRate,
    disabledForm,
    onRatingChange,
    onUserCommentEnter
  } = props;

  return (
    <form onSubmit={_handleSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div onChange={onRatingChange} className="reviews__rating-form form__rating">
        {children}
      </div>
      <textarea
        onChange={onUserCommentEnter}
        value={commentText}
        disabled={disabledForm}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={buttonDisable}>Submit</button>
      </div>
      {!isValidRate && <div style={{color: `red`}}> You need to rate</div>}
      {!isValidText && <div style={{color: `red`}}> You need to enter 50 - 300 characters, but entered {commentText.length}</div>}
    </form>
  );
};

ReviewForm.propTypes = {
  children: PropTypes.node,
  commentText: PropTypes.string.isRequired,
  buttonDisable: PropTypes.bool.isRequired,
  isValidText: PropTypes.bool.isRequired,
  isValidRate: PropTypes.bool.isRequired,
  disabledForm: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  offerId: PropTypes.number.isRequired,
  onUserCommentEnter: PropTypes.func.isRequired,
};


export default ReviewForm;
