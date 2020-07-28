import React, {PureComponent} from "react";
import Review from "../review/review.jsx";
import PropTypes from "prop-types";
import ReviewForm from "../review-form/review-form.jsx";
import {AuthorizationStatus, Operation as UserOperation} from "../../reducer/user/user.js";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getReviews, getLoadingReviewsInProgress} from "../../reducer/data/selectors.js";
import {Operation as DateOperation} from "../../reducer/data/data.js";
import Preload from "../preload/preload.jsx";


const MAX_COUNT_REVIEWS = 10;

class ReviewList extends PureComponent {

  componentDidMount() {
    const {loadReviews, offerId} = this.props;

    loadReviews(offerId);
  }

  _showPreload() {
    return <Preload/>;
  }

  _showReviews() {
    const {reviews, authorizationStatus, onSendComment, offerId} = this.props;
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
  }

  render() {
    const {isLoadingReviews} = this.props;
    if (isLoadingReviews) {
      return this._showPreload();
    }
    return this._showReviews();
  }
}


ReviewList.propTypes = {
  offerId: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onSendComment: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
  loadReviews: PropTypes.func.isRequired,
  isLoadingReviews: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  reviews: getReviews(state),
  isLoadingReviews: getLoadingReviewsInProgress(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSendComment(dataComment, offerId) {
    dispatch(UserOperation.sendComment(dataComment, offerId));
  },

  loadReviews(offerId) {
    dispatch(DateOperation.loadReviews(offerId));
  }
});

export {ReviewList};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
