import * as React from "react";
import {StatusOfReviewLoad} from "../../reducer/data/data";
import {Subtract} from "utility-types";


interface Props {
  onSendComment: ({comment, rating}: {comment: string; rating: number}, offerId: number) => void;
  offerId: number;
  statusOfReviewLoad: string;
  changeStatusOfReviewLoad: (tatusOfReviewLoad: string) => void;
}

interface State {
  rate: number;
  commentText: string;
  buttonDisable: boolean;
  isValidText: boolean;
  isValidRate: boolean;
  disabledForm: boolean;
}

interface InjectingProps {
  stars: React.ReactNode;
  textArea: React.ReactNode;
  startsError: React.ReactNode | false;
  textAreaError: React.ReactNode | false;
  loadError: React.ReactNode | false;
  buttonDisable: boolean;
  onSubmit: ({comment, rating}: {comment: string; rating: number}, offerId: number) => void;
  onRatingChange: (value: string) => void;
}

const RATINGS_TEXT = [`perfect`, `good`, `not bad`, `badly`, `terribly`];

const MIN_LENGTH_TEXT = 50;
const MAX_LENGTH_TEXT = 300;

const checkCorrectLengthText = (text) => text >= MIN_LENGTH_TEXT && text <= MAX_LENGTH_TEXT;

const withComment = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectingProps>;

  class WithComment extends React.PureComponent<T, State> {
    private _starRefs: React.RefObject<HTMLInputElement>[];

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

      this._starRefs = RATINGS_TEXT.map(() => React.createRef());

      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleRateChange = this.handleRateChange.bind(this);
      this.handleUserCommentEnter = this.handleUserCommentEnter.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (prevProps.statusOfReviewLoad !== this.props.statusOfReviewLoad) {
        const {statusOfReviewLoad} = this.props;
        if (statusOfReviewLoad === StatusOfReviewLoad.LOADED) {
          this._disableForm(false);
          this._resetForm();
        }
        if (statusOfReviewLoad === StatusOfReviewLoad.ERROR) {
          this._disableForm(false);
        }
        this._resetStatusOfReviewLoad();
      }
    }

    handleUserCommentEnter(evt) {
      const {value} = evt.target;
      this.setState({commentText: value}, this._validateForm);
    }

    handleRateChange({target: {value}}) {
      // const {value} = evt.target;
      this.setState({rate: +value}, this._validateForm);
    }

    handleFormSubmit(evt) {

      evt.preventDefault();
      const {onSendComment, offerId} = this.props;

      if (!this._validateForm()) {
        return;
      }

      this._disableForm(true);

      const dataComment = {
        comment: this.state.commentText,
        rating: this.state.rate,
      };
      onSendComment(dataComment, offerId);
    }

    _disableButton(bool) {
      this.setState({buttonDisable: bool});
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

    _resetStatusOfReviewLoad() {
      const {changeStatusOfReviewLoad} = this.props;
      changeStatusOfReviewLoad(StatusOfReviewLoad.NOT_IN_PROCESS);
    }

    _createStarsMarkup() {
      const startsCount = RATINGS_TEXT.length;

      const starsMarkup = RATINGS_TEXT.map((it, i) => {
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

    _createTextAreaMarkup() {
      return (
        <textarea
          onChange={this.handleUserCommentEnter}
          value={this.state.commentText}
          disabled={this.state.disabledForm}
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
        >
        </textarea>
      );
    }

    _createTextErrorMarkup() {
      return !this.state.isValidRate && <div style={{color: `red`}}> You need to rate</div>;
    }

    _createRatingErrorMarkup() {
      return !this.state.isValidText && <div style={{color: `red`}}> You need to enter 50 - 300 characters, but entered {this.state.commentText.length}</div>;
    }

    _createLoadErrorMarkup() {
      const {statusOfReviewLoad} = this.props;
      return statusOfReviewLoad === StatusOfReviewLoad.ERROR && <div style={{color: `red`}}> Somthing went wrong</div>;
    }

    render() {
      return (
        <Component
          {...this.props}
          stars={this._createStarsMarkup()}
          textArea={this._createTextAreaMarkup()}
          startsError={this._createRatingErrorMarkup()}
          textAreaError={this._createTextErrorMarkup()}
          loadError={this._createLoadErrorMarkup()}
          buttonDisable={this.state.buttonDisable}
          onSubmit={this.handleFormSubmit}
          onRatingChange={this.handleRateChange}
        />
      );
    }
  }

  return WithComment;
};


export default withComment;
