// Used in sagas to prepare the next action object using
// the response and meta data on the original action
// Very useful when you want to chain saga actions together,
// e.g. showImagePicker, resizeImage, uploadFile, SET_SYSTEM_MESSAGE
const prepareNextAction = (action, response) => {
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
};

export default prepareNextAction;
