// converts an object into an array, keeping the key (as id)
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

  where keyNameForFlatObject is the key name to create in the
  cases where a flat object is used, e.g.
  ({ foo: 'bar' }, 'name') => [{ name: 'bar', id: 'foo' }]
*/

const convertObjectToArray = (object, keyNameForFlatObject) => {
  let array = Object.keys(object).map((id) => {
    if (typeof object[id] === 'object') {
      return { ...object[id], id };
    }
    if (keyNameForFlatObject) {
      return {
        name: object[id],
        id,
      };
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
