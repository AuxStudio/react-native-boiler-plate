import cloneObject from '..';

const emptyObject = {};

const shallowObject = {
  foo: 'bar',
  bar: 'foo',
};

const deeplyNestedObject = {
  foo: 'bar',
  bar: {
    foo: 'bar',
    bar: {
      foo: 'bar',
      bar: {
        foo: 'bar',
        bar: {
          foo: 'bar',
          bar: 'foo',
        },
      },
    },
  },
};

describe('cloneObject', () => {
  it('should return a copy of an empty object', () => {
    expect(cloneObject(emptyObject)).toEqual(emptyObject);
  });

  it('should return a copy of a shallow object', () => {
    expect(cloneObject(shallowObject)).toEqual(shallowObject);
  });

  it('should return a copy of deeply nested object', () => {
    expect(cloneObject(deeplyNestedObject)).toEqual(deeplyNestedObject);
  });
});
