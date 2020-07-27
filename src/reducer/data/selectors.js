import NameSpace from "../name-space.js";


const getOffers = (state) => state[NameSpace.DATA].offers;
const getFavourite = (state) => state[NameSpace.DATA].favourite;
const getLoadOffersProgress = (state) => state[NameSpace.DATA].isLoadOffes;
const getLoadFavouriteProgress = (state) => state[NameSpace.DATA].isLoadFavourite;


export {getOffers, getFavourite, getLoadOffersProgress, getLoadFavouriteProgress};
