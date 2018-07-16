import convertObjectToArray from '..';

describe('convertObjectToArray()', () => {
  const data = {
    foo: 'bar',
  };

  it('should work with an empty object', () => {
    expect(convertObjectToArray({})).toEqual([]);
  });

  describe('should work with a flat object', () => {
    it('should return an empty array', () => {
      expect(convertObjectToArray(data)).toEqual([]);
    });

    it('should not return an empty array when second arg passed', () => {
      expect(convertObjectToArray(data, 'name')).toEqual([{ name: 'bar', id: 'foo' }]);
    });
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
