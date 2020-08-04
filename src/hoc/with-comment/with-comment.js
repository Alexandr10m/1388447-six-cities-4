import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const RATING_TEXT = [`perfect`, `good`, `not bad`, `badly`, `terribly`];
const MIN_LENGTH_TEXT = 50;
const MAX_LENGTH_TEXT = 300;
const checkCorrectLengthText = (text) => text >= MIN_LENGTH_TEXT && text <= MAX_LENGTH_TEXT;


const withComment = (Component) => {
  class WithComment extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        rate: 0,
        commentText: ``,
        buttonDisable: false,
        isValidText: true,
        isValidRate: true,
        disabledForm: false,
      };

      this._starRefs = RATING_TEXT.map(() => createRef());

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleRateChange = this._handleRateChange.bind(this);
      this._handleUserCommentEnter = this._handleUserCommentEnter.bind(this);
    }

    _validateForm() {
      const isCorrectText = checkCorrectLengthText(this.state.commentText.length);
      const isSelectedRating = this.state.rate > 0;

      this.setState({
        isValidText: isCorrectText,
        isValidRate: isSelectedRating
      });

      this._disableButton(true);

      if (isCorrectText && isSelectedRating) {
        this._disableButton(false);
      }

      return isCorrectText && isSelectedRating;
    }

    _handleUserCommentEnter(evt) {
      const {value} = evt.target;
      this.setState({commentText: value}, this._validateForm);
    }

    _handleRateChange(evt) {
      const {value} = evt.target;
      this.setState({rate: +value}, this._validateForm);
    }

    _disableButton(bool) {
      this.setState({buttonDisable: bool});
    }

    _handleFormSubmit(offerId) {
      const {onSendComment} = this.props;

      if (!this._validateForm()) {
        return;
      }

      this._disableForm(true);

      const dataComment = {
        comment: this.state.commentText,
        rating: this.state.rate,
      };

      onSendComment(dataComment, offerId);
      this._resetForm();
    }

    _disableForm(bool) {
      this._disableButton(bool);
      this.setState({disabledForm: bool});
    }

    _resetForm() {
      this.setState({
        commentText: ``,
        rate: 0,
      });

      this._starRefs.forEach((star) => {
        star.current.checked = false;
      });

      this._disableForm(false);
    }

    _createStarsMarkup() {
      const startsCount = RATING_TEXT.length;

      const starsMarkup = RATING_TEXT.map((it, i) => {
        const id = startsCount - i;
        return (
          <React.Fragment key={id}>
            <input ref={this._starRefs[id - 1]} disabled={this.state.disabledForm} className="form__rating-input visually-hidden" name="rating" value={id} id={`${id}-stars`} type="radio"/>
            <label htmlFor={`${id}-stars`} className="reviews__rating-label form__rating-label" title={it}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>
          </React.Fragment>
        );
      });

      return starsMarkup;
    }

    render() {
      return (
        <Component
          {...this.props}
          commentText={this.state.commentText}
          buttonDisable={this.state.buttonDisable}
          isValidText={this.state.isValidText}
          isValidRate={this.state.isValidRate}
          disabledForm={this.state.disabledForm}
          onSubmit={this._handleFormSubmit}
          onRatingChange={this._handleRateChange}
          onUserCommentEnter={this._handleUserCommentEnter}
        >
          {this._createStarsMarkup()}
        </Component>
      );
    }
  }

  WithComment.propTypes = {
    onSendComment: PropTypes.func.isRequired,
  };

  return WithComment;
};

export default withComment;
