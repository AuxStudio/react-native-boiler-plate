import getHours from '..';

describe('getHours', () => {
  it('should work', () => {
    const oneHourInMS = 1000 * 60 * 60; // ms * s * min
    const threeHoursAgo = Date.now() - oneHourInMS * 3;
    const fortyHoursAgo = Date.now() - oneHourInMS * 40;

    expect(getHours(threeHoursAgo)).toEqual(3);
    expect(getHours(fortyHoursAgo)).toEqual(40);
    expect(getHours()).toEqual(0);
  });
});
