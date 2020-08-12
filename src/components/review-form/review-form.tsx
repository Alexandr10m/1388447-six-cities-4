import * as React from "react";


interface Props {
  stars: React.ReactNode;
  textArea: React.ReactNode;
  startsError: React.ReactNode | boolean;
  textAreaError: React.ReactNode | boolean;
  buttonDisable: boolean;
  onSubmit: () => void;
  onRatingChange: () => void;
  loadError: React.ReactNode | boolean;
}
const ReviewForm: React.FunctionComponent<Props> = (props: Props) => {
  const {
    stars,
    textArea,
    startsError,
    textAreaError,
    buttonDisable,
    onSubmit,
    onRatingChange,
    loadError,
  } = props;

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


export default ReviewForm;
