import React from "react";
import Review from "../review/review.jsx";
import PropTypes from "prop-types";
import Form from "../review-form/review-form.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation} from "../../reducer/data/data.js";
import withComment from "../../hoc/with-comment/with-comment.js";
import {getStatusOfReviewLoad} from "../../reducer/data/selectors.js";
import {ActionCreator} from "../../reducer/data/data.js";


const MAX_COUNT_REVIEWS = 10;

const ReviewForm = withComment(Form);

const ReviewList = (props) => {
  const {reviews, authorizationStatus, onSendComment, offerId, statusOfReviewLoad, changeStatusOfReviewLoad} = props;

  const isShowingReviewForm = authorizationStatus === AuthorizationStatus.AUTH;
  const isReviews = reviews.length !== 0;
  const reviewCount = reviews.length > MAX_COUNT_REVIEWS ? MAX_COUNT_REVIEWS : reviews.length;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
          Reviews &middot; <span className="reviews__amount">{reviewCount}</span>
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


ReviewList.propTypes = {
  offerId: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onSendComment: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
  statusOfReviewLoad: PropTypes.string.isRequired,
  changeStatusOfReviewLoad: PropTypes.func.isRequired,
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
