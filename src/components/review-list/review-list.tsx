import * as React from "react";
import Review from "../review/review";
import Form from "../review-form/review-form";
import {AuthorizationStatus} from "../../reducer/user/user";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selectors";
import {Operation} from "../../reducer/data/data";
import withComment from "../../hoc/with-comment/with-comment";
import {getStatusOfReviewLoad} from "../../reducer/data/selectors";
import {ActionCreator} from "../../reducer/data/data";
import {Review as ReviewInterface} from "../../types";


interface Props {
  reviews: ReviewInterface[];
  authorizationStatus: string;
  offerId: number;
  statusOfReviewLoad: string;
  changeStatusOfReviewLoad: (statusOfReviewLoad: string) => void;
  onSendComment: ({comment, rating}: {comment: string, rating: number}, offerId: number) => void;
}

const MAX_COUNT_REVIEWS = 10;

const ReviewForm = withComment(Form);

const ReviewList: React.FunctionComponent<Props> = (props: Props) => {
  const {
    reviews,
    authorizationStatus,
    offerId,
    statusOfReviewLoad,
    changeStatusOfReviewLoad,
    onSendComment,
  } = props;

  const isShowingReviewForm = authorizationStatus === AuthorizationStatus.AUTH;
  const isReviews = reviews.length !== 0;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
          Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {isReviews && reviews.map((review, i) => {
          if (i < MAX_COUNT_REVIEWS) {
            return <Review
              key={review.id}
              {...review}/>;
          }
          return false;
        })}
      </ul>
      {isShowingReviewForm && <ReviewForm
        onSendComment={onSendComment}
        offerId={offerId}
        statusOfReviewLoad={statusOfReviewLoad}
        changeStatusOfReviewLoad={changeStatusOfReviewLoad}
      />}
    </section>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  statusOfReviewLoad: getStatusOfReviewLoad(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSendComment(dataComment, offerId) {
    dispatch(Operation.sendReview(dataComment, offerId));
  },
  changeStatusOfReviewLoad(status) {
    dispatch(ActionCreator.changeStatusOfReviewLoad(status));
  }
});


export {ReviewList};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
