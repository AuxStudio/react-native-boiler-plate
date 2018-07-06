// converts an object into an array, keeping the key (as oid)
/*
  {
    id_1: {
      foo: 'bar'
    },
    id_2: {
      foo: 'bar
    }
  }
  =>
  [{ foo: 'bar', id: 'id_1' }, { foo: 'bar', id: 'id_2' }]
*/

const convertObjectToArray = (object) => {
  let array = Object.keys(object).map((id) => {
    if (typeof object[id] === 'object') {
      return { ...object[id], id };
    }
    return null;
  });

  // Remove null items (if any)
  array = array.filter((item) => {
    if (item) {
      return item;
    }
  });

  return array;
};

export default convertObjectToArray;
