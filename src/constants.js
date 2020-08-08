const SORTS = [
  `Popular`,
  `Price: low to high`,
  `Price: high to low`,
  `Top rated first`,
];

const AppRoute = {
  DEFAULT_CITY: `/Amsterdam`,
  CITY: `/:city`,
  LOGIN: `/login`,
  OFFER: `/offer/:offerId`,
  ROOT: `/`,
  FAVOURITE: `/favorites`,
};

export {SORTS, AppRoute};
