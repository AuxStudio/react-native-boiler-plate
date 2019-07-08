// Used in sagas to prepare the next action object using
// the response and meta data on the original action
// spreads the response and meta.nextAction[X].payload over the payload
// Very useful when you want to chain saga actions together,
// e.g. showImagePicker, resizeImage, uploadFile, SET_SYSTEM_MESSAGE
const prepareNextActions = (action, response) => {
  if (action.meta && action.meta.nextActions) {
    const newNextActions = action.meta.nextActions.map((nextAction) => {
      return {
        ...nextAction,
        payload: {
          ...response,
          ...nextAction.payload,
        },
      };
    });

    return newNextActions;
  }

  return null;
};

export default prepareNextActions;
