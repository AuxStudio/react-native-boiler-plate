import isEmptyObject from '..';

describe('isEmptyObject', () => {
  it('should return false if an empty object was passed in', () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it('should return true if an object with at least one key was passed in', () => {
    expect(isEmptyObject({ foo: 'bar' })).toBe(false);
  });
});
