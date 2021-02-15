import * as React from "react";
import {StatusOfReviewLoad} from "../../reducer/data/data";
import {Subtract} from "utility-types";

import {CKEditor} from "@ckeditor/ckeditor5-react";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";


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
  isEditorWork: boolean;
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
        isEditorWork: false,
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

    private _disableButton(bool: boolean): void {
      this.setState({buttonDisable: bool});
    }
// ----start-----FOR ASFERRO
    private _setLocalStorage(text: string): void {
      localStorage.setItem(`textFromEditor`, JSON.stringify(text));
      console.log(localStorage.getItem(`textFromEditor`));
    }
// ----end-----FOR ASFERRO
    private _validateForm(): boolean {
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

    private _disableForm(bool: boolean): void {
      this._disableButton(bool);
      this.setState({disabledForm: bool});
    }

    private _resetForm(): void {
      this.setState({
        commentText: ``,
        rate: 0,
      });

      this._starRefs.forEach((star) => {
        star.current.checked = false;
      });

      this._disableForm(false);
    }

    private _resetStatusOfReviewLoad(): void {
      const {changeStatusOfReviewLoad} = this.props;
      changeStatusOfReviewLoad(StatusOfReviewLoad.NOT_IN_PROCESS);
    }

    private _createTextErrorMarkup(): boolean | React.ReactNode {
      return !this.state.isValidRate && <div style={{color: `red`}}> You need to rate</div>;
    }

    private _createRatingErrorMarkup(): boolean | React.ReactNode {
      return !this.state.isValidText && <div style={{color: `red`}}> You need to enter 50 - 300 characters, but entered {this.state.commentText.length}</div>;
    }

    private _createLoadErrorMarkup(): boolean | React.ReactNode {
      const {statusOfReviewLoad} = this.props;
      return statusOfReviewLoad === StatusOfReviewLoad.ERROR && <div style={{color: `red`}}> Somthing went wrong</div>;
    }

    private _createStarsMarkup(): React.ReactNode {
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
// ----start-----FOR ASFERRO
    handleUserCommentEnter(evt: React.FormEvent<HTMLDivElement>, editor:InstanceType<CKEditor>): void {
      const value = editor.getData();
      this.setState({commentText: value}, this._validateForm);

      this._setLocalStorage(value);
    }

    createEditorMarkup(): React.ReactNode {
      return (
      <CKEditor
          data={this.state.commentText}
          editor={ClassicEditor}
          onChange={this.handleUserCommentEnter}
      />);
    }
// ----end-----FOR ASFERRO

    handleRateChange({target: {value}}) {
      this.setState({rate: +value}, this._validateForm);
    }

    handleFormSubmit(evt): void {

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


    render() {
      const {buttonDisable} = this.state;
      return (
        <Component
          {...this.props}
          stars={this._createStarsMarkup()}
          textArea={this.createEditorMarkup()}
          startsError={this._createRatingErrorMarkup()}
          textAreaError={this._createTextErrorMarkup()}
          loadError={this._createLoadErrorMarkup()}
          buttonDisable={buttonDisable}
          onSubmit={this.handleFormSubmit}
          onRatingChange={this.handleRateChange}
        />
      );
    }
  }

  return WithComment;
};


export default withComment;
