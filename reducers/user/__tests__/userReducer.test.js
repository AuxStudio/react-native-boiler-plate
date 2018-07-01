import reducer from '..';
import initialState from '../initialState';

describe('userReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SIGN_IN_USER', () => {
    const user = {
      name: 'Test',
    };

    const payload = {
      user: {
        _user: user,
      },
    };

    const action = {
      type: 'SIGN_IN_USER',
      payload,
    };

    const expectedPayload = {
      ...user,
      authenticated: true,
    };

    expect(reducer(undefined, action)).toEqual(expectedPayload);
  });

  it('should handle UPDATE_USER_DATA', () => {
    const payload = {
      name: 'Test',
    };

    const action = {
      type: 'UPDATE_USER_DATA',
      payload,
    };

    expect(reducer(undefined, action)).toEqual(payload);
  });

  it('should handle SIGN_OUT_USER', () => {
    const action = {
      type: 'SIGN_OUT_USER',
    };

    expect(reducer(undefined, action)).toEqual(initialState);
  });
});
