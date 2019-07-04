import firstCharToUpperCase from '..';

describe('firstCharToUpperCase()', () => {
  it('should work', () => {
    expect(firstCharToUpperCase('hello')).toBe('Hello');
  });

  it('should not affect other characters', () => {
    expect(firstCharToUpperCase('heLlO')).toBe('HeLlO');
  });

  it('should remain unchanged in this case', () => {
    expect(firstCharToUpperCase('Hello')).toBe('Hello');
  });

  it('should not affect sentence use cases', () => {
    expect(firstCharToUpperCase('hello world')).toBe('Hello world');
  });
});
