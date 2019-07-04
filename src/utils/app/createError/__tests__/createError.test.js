import createError from '..';

describe('createError', () => {
  it('should create an error instance from a non error instance', () => {
    expect(createError('Test')).toBeInstanceOf(Error);
  });

  it('should return an error instance from an error instance', () => {
    expect(createError(new Error('test'))).toBeInstanceOf(Error);
  });
});
