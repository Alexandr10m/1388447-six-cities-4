import NameSpace from "../name-space.js";


const getOffers = (state) => state[NameSpace.DATA].offers;
const getFavourite = (state) => state[NameSpace.DATA].favourite;


export {getOffers, getFavourite};
