const strings = {};

// Takes a number/string and adds 0 padding if necessary and returns a string
function addZeroPadding(number) {
  const string = number.toString();
  return string < 10 ? `0${string}` : string;
}
strings.addZeroPadding = addZeroPadding;

export default strings;
