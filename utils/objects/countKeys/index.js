// Counts an objects keys (key: value pairs)
const countKeys = (obj) => {
  let count = 0;

  const doCount = (object) => {
    Object.keys(object).forEach((key) => {
      if (typeof object[key] === 'object') {
        doCount(object[key]);
      } else {
        count += 1;
      }
    });
  };

  doCount(obj);

  return count;
};

export default countKeys;
