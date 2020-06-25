const TYPES_OF_PLACES = [`apartment`, `privat room`, `house`, `hotel`];
const TITLES = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`, `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`
];
const PICTURES = [
  `img/apartment-01.jpg`,
  `img/room.jpg`,
  `img/apartment-02.jpg`,
  `img/apartment-03.jpg`,
  `img/apartment-01.jpg`,
  `img/room.jpg`,
];
const FACILITIES = [`Wi-Fi`, `Heating`, `Kitchen`, `Fridge`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Towels`, `Baby seat`, `Cabel TV`];
const COORDS = [[52.3909553943508, 4.85309666406198], [52.369553943508, 4.85309666406198], [52.3909553943508, 4.929309666406198], [52.3809553943508, 4.939309666406198]];

const getRandomArrayItem = (array) => {
  const randomItem = getRandomIntegerNumber(0, array.length);
  return array[randomItem];
};
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};
const getRandomArrayLength = (array) => {
  const length = getRandomIntegerNumber(1, array.length);
  const copyArray = [...array];
  copyArray.length = length;
  return copyArray;
};

const createOffers = (count) => {
  const offers = [];

  for (let i = 0; i < count; i++) {
    offers.push({
      isPremium: Math.random() > 0.5,
      pictures: getRandomArrayLength(PICTURES),
      price: getRandomIntegerNumber(1, 1000),
      isFavourite: Math.random() > 0.5,
      grade: getRandomIntegerNumber(0, 5),
      title: getRandomArrayItem(TITLES),
      type: getRandomArrayItem(TYPES_OF_PLACES),
      bedroom: getRandomIntegerNumber(0, 5),
      maxAdults: getRandomIntegerNumber(1, 10),
      facilities: getRandomArrayLength(FACILITIES),
      coords: getRandomArrayItem(COORDS),
    });
  }

  return offers;
};


export {createOffers};
