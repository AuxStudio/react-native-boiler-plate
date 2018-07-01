import getPrettyDate from '..';

describe('getPrettyDate', () => {
  // Sat, 3 Feb
  it('should return in the format: Sat, 3 Feb (Day, Date Month) from a unix timestamp', () => {
    expect(getPrettyDate(1528620071607)).toBe('Sun, 10 June');
    expect(getPrettyDate(992162509000)).toBe('Sun, 10 June'); // 2001
    expect(getPrettyDate(1515573709000)).toBe('Wed, 10 Jan');
    expect(getPrettyDate(1527842509000)).toBe('Fri, 1 June');
  });
});
