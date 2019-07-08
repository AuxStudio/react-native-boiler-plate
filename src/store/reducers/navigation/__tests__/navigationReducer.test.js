import reducer from '..';
import initialState from '../initialState';

describe('navigationReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
