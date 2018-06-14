import getTime from '../';

it('should return a time in the format, 13:00 (hh:mm) from a unix timestamp', () => {
  expect(getTime(1527842509000)).toBe('10:41');
  expect(getTime(1515202909000)).toBe('03:41');
  expect(getTime(1515246109000)).toBe('15:41');
  expect(getTime(1515271309000)).toBe('22:41');
});
