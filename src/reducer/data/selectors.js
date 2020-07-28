import NameSpace from "../name-space.js";


const getOffers = (state) => state[NameSpace.DATA].offers;
const getFavourite = (state) => state[NameSpace.DATA].favourite;
const getReviews = (state) => state[NameSpace.DATA].reviews;
const getLoadOffersProgress = (state) => state[NameSpace.DATA].isLoadOffes;
const getLoadFavouriteProgress = (state) => state[NameSpace.DATA].isLoadFavourite;
const getLoadingReviewsInProgress = (state) => state[NameSpace.DATA].isLoadingReviews;

export {
  getOffers,
  getFavourite,
  getReviews,
  getLoadOffersProgress,
  getLoadFavouriteProgress,
  getLoadingReviewsInProgress
};
