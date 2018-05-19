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

// Used in sagas to prepare the next action object using the response and meta data on the original action
// Very useful when you want to chain saga actions together, e.g. showImagePicker, resizeImage, uploadFile, SET_SYSTEM_MESSAGE
function prepareNextAction(action, response) {
  if (response && action.meta && action.meta.nextAction) {
    let payload = {};
    const nextActionPayload = action.meta.nextAction.payload;

    if (nextActionPayload) {
      payload = {
        ...response,
        ...nextActionPayload,
      };
    } else {
      payload = {
        ...response,
      };
    }

    return {
      ...action.meta.nextAction,
      payload,
    };
  }
  return null;
}
utils.prepareNextAction = prepareNextAction;

export default utils;
