// takes two numbers and returns the percentage representation of them rounded
const getPercentage = (a, b) => {
  const percentage = (a / b) * 100;
  const roundedPercentage = Math.round(percentage);

  return roundedPercentage;
};

export default getPercentage;
