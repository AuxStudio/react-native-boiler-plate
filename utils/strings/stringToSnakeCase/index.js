// Takes a string and returns it in snake_case format
const stringToSnakeCase = (string) => {
  const words = string.split(' ');
  const newWords = words.map((word) => {
    return word.toLowerCase();
  });
  const newString = newWords.join('_');

  return newString;
};

export default stringToSnakeCase;
