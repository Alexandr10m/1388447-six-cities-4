const CITIES = [
  `Paris`,
  `Cologne`,
  `Brussels`,
  `Amsterdam`,
  `Hamburg`,
  `Dusseldorf`
];

const SORTS = [
  `Popular`,
  `Price: low to high`,
  `Price: high to low`,
  `Top rated first`,
];

const AppRoute = {
  DEFAULT_CITY: `/Paris`,
  CITY: `/:city`,
  LOGIN: `/login`,
  OFFER: `/offer/:offerId`,
  ROOT: `/`,
  FAVOURITE: `/favourite`,
};

export {CITIES, SORTS, AppRoute};
