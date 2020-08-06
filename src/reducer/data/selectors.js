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
const getCities = (state) => state[NAME_SPACE].cities;
const getFavourite = (state) => state[NAME_SPACE].favourite;
const getReviews = (state) => sortReviewsByDate(state[NAME_SPACE].reviews);
const getNearbyOffers = (state) => state[NAME_SPACE].nearbyOffers;
const getLoadOffersProgress = (state) => state[NAME_SPACE].isLoadingOffes;
const getLoadFavouriteProgress = (state) => state[NAME_SPACE].isLoadingFavourite;
const getLoadingReviewsInProgress = (state) => state[NAME_SPACE].isLoadingReviews;
const getStatusOfReviewLoad = (state) => state[NAME_SPACE].statusOfReviewLoad;
const getLoadingNearbyOffersInProgress = (state) => state[NAME_SPACE].isLoadingNearbyOffers;
const getErrorOfNetwork = (state) => state[NAME_SPACE].isErrorOfNetwork;
const getTextError = (state) => state[NAME_SPACE].textError;


export {
  getOffers,
  getCities,
  getFavourite,
  getReviews,
  getNearbyOffers,
  getLoadOffersProgress,
  getLoadFavouriteProgress,
  getLoadingReviewsInProgress,
  getStatusOfReviewLoad,
  getLoadingNearbyOffersInProgress,
  getErrorOfNetwork,
  getTextError,
};
