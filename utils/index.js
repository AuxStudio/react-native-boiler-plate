const utils = {};

function cloneObject(object) {
  // returns a copy of an object
  return JSON.parse(JSON.stringify(object));
}
utils.cloneObject = cloneObject;

function createError(error) {
  // creates an Error instance from an error if it is not one already
  return error instanceof Error ? error : new Error(error);
}
utils.createError = createError;

function log(descriptor, data) {
  // logs a descriptor and data if in dev mode
  if (__DEV__) {
    console.log(descriptor, JSON.stringify(data));
  }
}
utils.log = log;

export default utils;
