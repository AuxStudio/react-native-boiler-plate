const initialState = {
  loading: true, // assume true on app open
  deviceLocation: null,
  systemMessage: {
    message: null,
    code: null,
    error: null,
  },
  network: null,
  realtimeDatabaseMode: true, // assume true on app open
};

export default initialState;
