import PropTypes from "prop-types";
import React from "react";

const ReviewForm = (props) => {

  const {stars, textArea, startsError, textAreaError, buttonDisable, onSubmit, onRatingChange, loadError} = props;

  return (
    <form onSubmit={onSubmit} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div onChange={onRatingChange} className="reviews__rating-form form__rating">

        {stars}

      </div>

      {textArea}

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={buttonDisable}>Submit</button>
      </div>

      {startsError}
      {textAreaError}
      {loadError}

    </form>
  );
};

ReviewForm.propTypes = {
  stars: PropTypes.node.isRequired,
  textArea: PropTypes.node.isRequired,
  startsError: PropTypes.node.isRequired,
  textAreaError: PropTypes.node.isRequired,
  loadError: PropTypes.node.isRequired,
  buttonDisable: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
};


export default ReviewForm;
