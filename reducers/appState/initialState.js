const initialState = {
  appStart: false,
  loading: true,
  // TODO: refactor this error object
  error: {
    errorType: null,
    message: null,
    iconName: null,
    success: null,
    autoHide: null,
    action: {
      type: null,
      text: null,
      data: null,
    },
  },
  deviceLocation: null,
  temporaryImage: null,
};

export default initialState;
