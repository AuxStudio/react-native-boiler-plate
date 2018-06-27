jest.mock('react-native-router-flux', () => ({
  ActionConst: 'ActionConst',
}));

/* eslint-disable import/first */
// mock needs to be before imports
import reducer from '../';
import initialState from '../initialState';
/* eslint-enable */

describe('navigationReducer', () => {
  it('should return the initial state', () => {
    expect(reducer({ undefined }, {})).toEqual(initialState);
  });
});
