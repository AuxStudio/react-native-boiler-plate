// Used in sagas to prepare the next action object using
// the response and meta data on the original action
// spreads the response and meta.nextAction.payload over the payload
// Very useful when you want to chain saga actions together,
// e.g. showImagePicker, resizeImage, uploadFile, SET_SYSTEM_MESSAGE
const prepareNextAction = (action, response) => {
  if (action.meta && action.meta.nextAction) {
    const nextActionPayload = action.meta.nextAction.payload;
    const payload = {
      ...response,
      ...nextActionPayload,
    };

    const nextAction = {
      ...action.meta.nextAction,
      payload,
    };

    return nextAction;
  }
  return null;
};

export default prepareNextAction;
