const initialState = {
  loading: true, // assume true on app open
  deviceLocation: null,
  systemMessage: null,
  network: null,
  firebase: {
    pendingTransactions: [],
  },
};

export default initialState;
