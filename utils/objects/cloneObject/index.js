// returns a copy of an object
const cloneObject = (object) => {
  return JSON.parse(JSON.stringify(object));
};

export default cloneObject;
