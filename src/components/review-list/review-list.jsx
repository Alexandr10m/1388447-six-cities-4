import React from "react";
import Review from "../review/review.jsx";
import PropTypes from "prop-types";
import ReviewForm from "../review-form/review-form.jsx";
import {AuthorizationStatus, Operation} from "../../reducer/user/user.js";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selecors.js";


const ReviewList = (props) => {
  const {reviews, authorizationStatus, onSendComment, offerId} = props;
  const isShowingReviewForm = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) =>{
          return <Review
            key={(new Date() + 1).toString()}
            review={review}
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
  reviews: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSendComment(dataComment, offerId) {
    dispatch(Operation.sendComment(dataComment, offerId));
  }
});

export {ReviewList};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
