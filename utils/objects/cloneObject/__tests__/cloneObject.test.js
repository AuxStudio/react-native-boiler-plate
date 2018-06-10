import cloneObject from '../';

const object = {
  foo: 'bar',
  bar: 'foo',
};

it('should return a copy of an object', () => {
  expect(cloneObject(object)).toEqual(object);
});
