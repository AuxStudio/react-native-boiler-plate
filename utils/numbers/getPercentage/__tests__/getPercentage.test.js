import getPercentage from '..';

describe('getPercentage()', () => {
  it('should work with numbers', () => {
    expect(getPercentage(1, 2)).toEqual(50);
    expect(getPercentage(2, 3)).toEqual(67);
  });

  it('should work with a zero numerator', () => {
    expect(getPercentage(0, 3)).toEqual(0);
  });

  it('should work with strings', () => {
    expect(getPercentage('1', '3')).toEqual(33);
  });
});
