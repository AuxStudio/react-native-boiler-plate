/*
  Converts the first character of a string to uppercase

  E.g. hello => Hello, Hello => Hello, hellO => HellO
*/
const firstCharToUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default firstCharToUpperCase;
