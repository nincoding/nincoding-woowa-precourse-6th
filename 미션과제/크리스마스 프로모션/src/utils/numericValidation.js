const isNumeric = (input) => {
  const numberRegExp = /^\d+$/;

  return numberRegExp.test(input) && !Number.isNaN(Number(input));
};

const isInteger = (input) => {
  return Number.isInteger(Number(input));
};

export { isNumeric, isInteger };
