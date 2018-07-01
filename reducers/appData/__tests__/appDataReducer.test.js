import reducer from '..';
import initialState from '../initialState';

describe('appDataReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_APP_DATA', () => {
    const payload = {
      data: true,
      ref: 'app',
    };

    const action = {
      type: 'SET_APP_DATA',
      payload,
    };

    expect(reducer(undefined, action).app).toEqual(payload.data);
  });
});
