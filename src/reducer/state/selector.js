import NameSpace from "../../name-space.js";
import {createSelector} from "reselect";
import {getOffers} from "../data/selectors.js";


const sortByType = (sortType, city, offers) => {
  const showedOffers = offers.find((it) => it.city === city);

  const copyArray = [...showedOffers.localOffers];

  switch (sortType) {
    case `Popular`:
      break;
    case `Price: low to high`:
      copyArray.sort((prevOffer, nextOffer) => prevOffer.price - nextOffer.price);
      break;
    case `Price: high to low`:
      copyArray.sort((prevOffer, nextOffer) => nextOffer.price - prevOffer.price);
      break;
    case `Top rated first`:
      copyArray.sort((prevOffer, nextOffer) => nextOffer.grade - prevOffer.grade);
      break;
  }

  return copyArray;
};

const STATE = NameSpace.STATE;
const getCity = (state) => state[STATE].city;
const getShowedOffer = (state) => state[STATE].showedOffer;
const getSortType = (state) => state[STATE].sortType;
const getIndicatedCard = (state) => state[STATE].indicatedCard;
const getLocalOffers = createSelector(
    getSortType,
    getCity,
    getOffers,
    sortByType
);


export {getCity, getShowedOffer, getSortType, getIndicatedCard, getLocalOffers};
