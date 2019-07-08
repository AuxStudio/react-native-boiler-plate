import addZeroPadding from '..';

describe('addZeroPadding', () => {
  it('should return a zero padded string if < 10', () => {
    expect(addZeroPadding(5)).toBe('05');
  });

  it('should return the same number as a string if === 10', () => {
    expect(addZeroPadding(10)).toBe('10');
  });

  it('should return the same number as a string if > 10', () => {
    expect(addZeroPadding(15)).toBe('15');
  });
});
