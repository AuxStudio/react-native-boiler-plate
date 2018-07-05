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
  const array = Object.keys(object).map((id) => {
    return { ...object[id], id };
  });

  return array;
};

export default convertObjectToArray;
