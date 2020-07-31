import NameSpace from "../name-space.js";


const sortReviewsByDate = (reviews) => {

  if (reviews.length === 0) {
    return reviews;
  }

  const copyReviews = [...reviews];
  copyReviews.sort((prev, next) => next.date.getTime() - prev.date.getTime());

  return copyReviews;
};

const NAME_SPACE = NameSpace.DATA;

const getOffers = (state) => state[NAME_SPACE].offers;
const getFavourite = (state) => state[NAME_SPACE].favourite;
const getReviews = (state) => sortReviewsByDate(state[NAME_SPACE].reviews);
const getNearbyOffers = (state) => state[NAME_SPACE].nearbyOffers;
const getLoadOffersProgress = (state) => state[NAME_SPACE].isLoadOffes;
const getLoadFavouriteProgress = (state) => state[NAME_SPACE].isLoadFavourite;
const getLoadingReviewsInProgress = (state) => state[NAME_SPACE].isLoadingReviews;
const getLoadingNearbyOffersInProgress = (state) => state[NAME_SPACE].isLoadingNearbyOffers;


export {
  getOffers,
  getFavourite,
  getReviews,
  getNearbyOffers,
  getLoadOffersProgress,
  getLoadFavouriteProgress,
  getLoadingReviewsInProgress,
  getLoadingNearbyOffersInProgress,
};
