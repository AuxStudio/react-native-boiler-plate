import stringToSnakeCase from '..';

describe('stringToSnakeCase()', () => {
  it('should work', () => {
    expect(stringToSnakeCase('Hello world')).toEqual('hello_world');
    expect(stringToSnakeCase('HELLO WORLD')).toEqual('hello_world');
    expect(stringToSnakeCase('HELLO')).toEqual('hello');
  });
});
