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
    let dataString;
    // JSON.stringify fails on circular objects
    try {
      dataString = JSON.stringify(data);
    } catch (error) {
      dataString = data;
    }
    console.log(descriptor, dataString);
  }
}
utils.log = log;

function createUID() {
  // creates a unique id
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); // use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = ((d + Math.random() * 16) % 16) | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
utils.createUID = createUID;

export default utils;
