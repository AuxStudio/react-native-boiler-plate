import countKeys from '..';

describe('countKeys()', () => {
  const shallowObject = {
    foo: 'bar',
  };

  const nestedObject = {
    a: {
      foo: 'bar',
    },
    b: {
      foo: 'bar',
    },
  };

  const deeplyNestedObject = {
    a: {
      foo: {
        foo: 'bar',
        baz: 'bus',
      },
    },
    b: {
      foo: {
        foo: 'bar',
        baz: 'bus',
      },
    },
  };

  const array = [0, 1, 2, 3, 4];

  const mixed = {
    a: {
      foo: {
        foo: array,
        baz: 'bus',
      },
    },
    b: {
      foo: {
        foo: 'bar',
        baz: 'bus',
      },
    },
  };

  it('should work', () => {
    expect(countKeys(shallowObject)).toBe(1);
    expect(countKeys(nestedObject)).toBe(2);
    expect(countKeys(deeplyNestedObject)).toBe(4);
    expect(countKeys(array)).toBe(5);
    expect(countKeys(mixed)).toBe(8);
  });
});
