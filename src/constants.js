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
  FAVOURITE: `/favourite`,
};

export {SORTS, AppRoute};
