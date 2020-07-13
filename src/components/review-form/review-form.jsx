import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";


const RatingText = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

const createStarsMarkup = (refs) => {
  const startsCount = RatingText.length;

  const starsMarkup = RatingText.map((it, i) => {
    const id = startsCount - i;
    return (
      <React.Fragment key={id}>
        <input ref={refs[i]} className="form__rating-input visually-hidden" name="rating" value={id} id={`${id}-stars`} type="radio"/>
        <label htmlFor={`${id}-stars`} className="reviews__rating-label form__rating-label" title={it}>
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </React.Fragment>
    );
  });

  return starsMarkup;
};

class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);
    this.starsRef = RatingText.map(() => createRef());
    this.textAreaRef = createRef();
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const {onSendComment, offerId} = this.props;
    const checkedStar = this.starsRef.find((it) => it.current.checked);

    const dataComment = {
      comment: this.textAreaRef.current.value,
      rating: +checkedStar.current.value,
    };

    onSendComment(dataComment, offerId);
  }

  render() {
    return (
      <form onSubmit={this._handleFormSubmit} className="reviews__form form" action="#" method="post">
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {createStarsMarkup(this.starsRef)}
        </div>
        <textarea ref={this.textAreaRef} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
        </div>
      </form>
    );
  }
}

ReviewForm.propTypes = {
  onSendComment: PropTypes.func.isRequired,
  offerId: PropTypes.number.isRequired,
};


export default ReviewForm;
