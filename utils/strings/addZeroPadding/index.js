// Takes a number/string and adds 0 padding if necessary and returns a string
const addZeroPadding = (number) => {
  const string = number.toString();
  return string < 10 ? `0${string}` : string;
};

export default addZeroPadding;
