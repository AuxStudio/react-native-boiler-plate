const initialState = {
  loading: true, // assume true on app open
  deviceLocation: null,
  systemMessage: {
    message: null,
    code: null,
    error: null,
  },
  network: null,
  firebase: {
    pendingTransactions: [],
  },
};

export default initialState;
