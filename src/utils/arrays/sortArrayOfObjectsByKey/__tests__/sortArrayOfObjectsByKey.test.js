import sortArrayOfObjectsByKey from '..';

describe('sortArrayOfObjectsByKey()', () => {
  const shaun = {
    name: 'Shaun',
    order: 5,
  };
  const astrid = {
    name: 'Astrid',
    order: 10,
  };
  const tracey = {
    name: 'Tracey',
    order: 2,
  };
  const sortOn = 'order';
  const unsortedArray = [shaun, astrid, tracey];
  const sortedArray = [tracey, shaun, astrid];
  const reversedSortedArray = [astrid, shaun, tracey];

  it('should work normally', () => {
    expect(sortArrayOfObjectsByKey(unsortedArray, sortOn)).toEqual(sortedArray);
  });

  it('should work in reverse', () => {
    expect(sortArrayOfObjectsByKey(unsortedArray, sortOn, true)).toEqual(reversedSortedArray);
  });

  it('should work when the given key is not present in the objects', () => {
    expect(sortArrayOfObjectsByKey(unsortedArray, 'border')).toEqual(unsortedArray);
  });

  it('should work when the given key is not present in the objects', () => {
    expect(sortArrayOfObjectsByKey(unsortedArray, null)).toEqual(unsortedArray);
  });
});
