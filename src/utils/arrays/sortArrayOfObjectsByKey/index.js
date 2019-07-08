// sorts an array of objects by key
// with optional reverse order functionality
const sortArrayOfObjectsByKey = (array, key, reverseOrder) => {
  const sortedArray = array.sort((a, b) => {
    return a[key] > b[key] ? (reverseOrder ? -1 : 1) : reverseOrder ? 1 : -1;
  });
  return sortedArray;
};

export default sortArrayOfObjectsByKey;
