import convertObjectToArray from '..';

describe('convertObjectToArray()', () => {
  const data = {
    foo: 'bar',
  };

  it('should work with an empty object', () => {
    expect(convertObjectToArray({})).toEqual([]);
  });

  // Should work but its not the typical use case
  it('should work with a shallow object', () => {
    expect(convertObjectToArray(data)).toEqual([
      {
        0: 'b',
        1: 'a',
        2: 'r',
        id: 'foo',
      },
    ]);
  });

  it('should work well with a nested object', () => {
    expect(
      convertObjectToArray({
        events: {
          a: data,
          b: data,
          c: data,
        },
      }),
    ).toEqual([
      {
        a: data,
        b: data,
        c: data,
        id: 'events',
      },
    ]);
  });
});
