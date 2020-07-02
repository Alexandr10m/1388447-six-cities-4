const firstWordInUpper = (str) => {
  const isString = typeof str === `string` || !!str;
  return isString ? str[0].toUpperCase() + str.slice(1) : str;
};

const getOptionValue = (str) => {
  const slices = str.toLowerCase().split(` `);

  if (slices.length === 1) {
    return slices[0];
  }
  if (slices.length === 3) {
    return `${slices[0]}-${slices[1]}`;
  }

  return `${slices[2]}-${slices[3]}`;
};

const rating = (grade) => ({width: `${grade * 20}%`});

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const sortByType = (type, array) => {
  const copyArray = [...array];

  switch (type) {
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


export {firstWordInUpper, rating, extend, sortByType, getOptionValue};
