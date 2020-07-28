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

const getCorrectDate = (number) => {
  const correctDate = number < 10 ? `0${number}` : number;

  return correctDate;
};

const getDate = (date) => {
  const month = getCorrectDate(date.getMonth() + 1);
  const day = getCorrectDate(date.getDate());

  return `${date.getFullYear()}-${month}-${day}`;
};

const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

const getMonthAndYear = (date) => {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};


export {firstWordInUpper, rating, extend, getOptionValue, getDate, getMonthAndYear};
