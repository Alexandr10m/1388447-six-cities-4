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
  `img/apartment-03.jpg`
];

const getRandomArrayItem = (array) => {
  const randomItem = getRandomIntegerNumber(0, array.length);
  return array[randomItem];
};
const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const createOffers = (count) => {
  const offers = [];

  for (let i = 0; i < count; i++) {
    offers.push({
      isPremium: Math.random() > 0.5,
      picture: getRandomArrayItem(PICTURES),
      price: getRandomIntegerNumber(1, 1000),
      isFavourite: Math.random() > 0.5,
      grade: getRandomIntegerNumber(0, 5),
      title: getRandomArrayItem(TITLES),
      type: getRandomArrayItem(TYPES_OF_PLACES),
    });
  }

  return offers;
};


export {createOffers};
