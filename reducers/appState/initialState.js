const initialState = {
  loading: true, // assume true on app open
  deviceLocation: {
    lat: null,
    lng: null,
  },
  systemMessage: null,
  network: {
    type: null,
    effectiveType: null,
  },
  pendingTransactions: [],
};

export default initialState;
