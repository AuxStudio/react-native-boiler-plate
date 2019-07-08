// returns a copy of an object
// FIXME
const cloneObject = (object) => {
  try {
    return JSON.parse(JSON.stringify(object)); // fails for circular objects
  } catch (error) {
    return { ...object }; // components don't always update with this
  }
};

export default cloneObject;
