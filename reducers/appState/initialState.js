const initialState = {
  appStart: null,
  loading: true, // assume true on app open
  systemMessage: {
    message: null,
    error: null,
  },
  deviceLocation: null,
};

export default initialState;
