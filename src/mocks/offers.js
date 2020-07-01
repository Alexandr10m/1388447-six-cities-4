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

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const COORDS = [
  [52.3909553943508, 4.85309666406198],
  [52.369553943508, 4.85309666406198],
  [52.3909553943508, 4.929309666406198],
  [52.3809553943508, 4.939309666406198]
];

const getRandomArrayItem = (array) => {
  const randomItem = getRandomIntegerNumber(0, array.length);
  return array[randomItem];
};

const getRandomArrayLength = (array) => {
  const length = getRandomIntegerNumber(1, array.length);
  const copyArray = [...array];
  copyArray.length = length;

  return copyArray;
};

const City = {
  Paris: [48.85341, 2.34880],
  Amsterdam: [52.38333, 4.9],
  Cologne: [45.57862, 9.941800],
  Brussels: [50.85045, 4.3487800],
  Hamburg: [53.57532, 10.0153400],
  Dusseldorf: [51.22172, 6.77616],
};


const createOffers = (cityName, count) => {
  const offers = {
    city: Object.keys(City).find((it) => it === cityName),
    cityCoords: City[cityName],
    localOffers: [],
  };

  for (let i = 0; i < count; i++) {
    offers.localOffers.push({
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
      coords: COORDS[i],
      id: new Date() + i,
      reviews: [{
        image: `img/avatar-max.jpg`,
        text: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
        name: `Max`,
        time: `April 2019`,
      }],
    });
  }

  return offers;
};


export {createOffers};
