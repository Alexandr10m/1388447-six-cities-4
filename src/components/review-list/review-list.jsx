import React from "react";
import Review from "../review/review.jsx";
import PropTypes from "prop-types";
import ReviewForm from "../review-form/review-form.jsx";
import {AuthorizationStatus, Operation as UserOperation} from "../../reducer/user/user.js";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";


const MAX_COUNT_REVIEWS = 10;

const ReviewList = (props) => {
  const {reviews, authorizationStatus, onSendComment, offerId} = props;

  const isShowingReviewForm = authorizationStatus === AuthorizationStatus.AUTH;
  const isReviews = reviews.length !== 0;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
          Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {isReviews && reviews.map((review, i) =>{
          if (i > MAX_COUNT_REVIEWS) {
            return false;
          }
          return <Review
            key={(review.id).toString()}
            {...review}
          />;
        })}
      </ul>
      {isShowingReviewForm && <ReviewForm onSendComment={onSendComment} offerId={offerId}/>}
    </section>
  );
};


ReviewList.propTypes = {
  offerId: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onSendComment: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSendComment(dataComment, offerId) {
    dispatch(UserOperation.sendComment(dataComment, offerId));
  },
});

export {ReviewList};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
