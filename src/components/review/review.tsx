import * as React from "react";
import {rating, getDate, getMonthAndYear} from "../../utils";
import {Review as ReviewInterface} from "../../types";


type Props = ReviewInterface;

const Review: React.FunctionComponent<Props> = (props: Props) => {
  const {
    user,
    text,
    date,
    grade,
  } = props;
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


export default Review;
