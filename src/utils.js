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


export {firstWordInUpper, rating, extend, getOptionValue};
