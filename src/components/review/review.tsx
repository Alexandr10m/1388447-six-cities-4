import * as React from "react";
import PropTypes from "prop-types";
import {rating, getDate, getMonthAndYear} from "../../utils.js";


const Review = (props) => {
  const {user, text, date, grade} = props;
  const {avatarUrl, name} = user;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={`${avatarUrl}`} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={rating(grade)}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {text}
        </p>
        <time className="reviews__time" dateTime={getDate(date)}>{getMonthAndYear(date)}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  grade: PropTypes.number.isRequired,
};


export default Review;
