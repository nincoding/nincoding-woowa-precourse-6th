const addCommaAmount = (number) => {
  const formattedNumber = new Intl.NumberFormat('ko-KR').format(number);

  return formattedNumber;
};

export default addCommaAmount;
