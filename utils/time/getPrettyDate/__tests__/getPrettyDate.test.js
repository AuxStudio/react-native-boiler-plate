import getPrettyDate from '..';

describe('getPrettyDate', () => {
  it('should return in the format: Sat, 3 Feb (Day, Date Month) from a unix timestamp', () => {
    expect(getPrettyDate(1528620071607)).toBe('Sunday, 10 June');
    expect(getPrettyDate(992162509000)).toBe('Sunday, 10 June'); // 2001
    expect(getPrettyDate(1515573709000)).toBe('Wednesday, 10 January');
    expect(getPrettyDate(1527842509000)).toBe('Friday, 1 June');
  });

  it('should show the year if second argument is true', () => {
    expect(getPrettyDate(1528620071607, true)).toBe('Sunday, 10 June 2018');
  });

  it('should abbreviate if the third argument is true', () => {
    expect(getPrettyDate(1528620071607, false, true)).toBe('Sun, 10 Jun');
  });
});
