const firstWordInUpper = (str) => {
  const isString = typeof str === `string` || !!str;

  return isString ? str[0].toUpperCase() + str.slice(1) : str;
};

const rating = (grade) => ({width: `${grade * 20}%`});


export {firstWordInUpper, rating};
