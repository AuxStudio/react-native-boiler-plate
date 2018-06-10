import reducer from '../';
import initialState from '../initialState';

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it('should handle TOGGLE_LOADING', () => {
  const action = {
    type: 'TOGGLE_LOADING',
  };

  expect(reducer(undefined, action).loading).toEqual(false); // initial is true
});

it('should handle SET_DEVICE_LOCATION', () => {
  const payload = {
    coords: {
      lat: 'lat',
      lng: 'lng',
    },
  };

  const action = {
    type: 'SET_DEVICE_LOCATION',
    payload,
  };

  expect(reducer(undefined, action).deviceLocation).toEqual(payload.coords);
});

it('should handle SET_SYSTEM_MESSAGE', () => {
  const payload = {
    message: 'Test',
    code: 12345,
  };

  const action = {
    type: 'SET_SYSTEM_MESSAGE',
    payload,
    error: true,
  };

  const expectedPayload = payload;
  expectedPayload.error = action.error;

  expect(reducer(undefined, action).systemMessage).toEqual(expectedPayload);
});

it('should handle RESET_SYSTEM_MESSAGE', () => {
  const action = {
    type: 'RESET_SYSTEM_MESSAGE',
  };

  expect(reducer(undefined, action).systemMessage).toEqual(initialState.systemMessage);
});

it('should handle SET_NETWORK_CONNECTION_INFO', () => {
  const payload = {
    network: {
      ConnectionType: 'wifi',
      EffectiveConnectionType: '4g',
    },
  };

  const action = {
    type: 'SET_NETWORK_CONNECTION_INFO',
    payload,
  };

  expect(reducer(undefined, action).network).toEqual(payload.network);
});

it('should handle TOGGLE_REALTIME_DATABASE_MODE', () => {
  const action = {
    type: 'TOGGLE_REALTIME_DATABASE_MODE',
  };

  expect(reducer(undefined, action).realtimeDatabaseMode).toEqual(false); // initial is true
});
