// logs a descriptor and data if in dev mode
const log = (descriptor, data) => {
  if (__DEV__) {
    let dataString;
    // JSON.stringify fails on circular objects
    try {
      dataString = JSON.stringify(data);
    } catch (error) {
      dataString = data;
    }
    console.log(descriptor, dataString);
    return { descriptor, data: dataString };
  }
  return null;
};

export default log;
