const utils = {};

function cloneObject(object) {
  return JSON.parse(JSON.stringify(object));
}
utils.cloneObject = cloneObject;

export default utils;
