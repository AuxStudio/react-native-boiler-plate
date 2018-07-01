import log from '..';

const data = {
  string: 'string',
  number: 1,
  object: {
    foo: 'bar',
  },
  array: ['foo', 'bar'],
};

describe('log', () => {
  it('should return the descriptor and data being logged as strings', () => {
    expect(log('test', data)).toEqual({
      descriptor: 'test',
      data: JSON.stringify(data),
    });
  });

  it('should return the descriptor and no data if no data is being logged', () => {
    expect(log('test', null)).toEqual({
      descriptor: 'test',
      data: JSON.stringify(null),
    });
  });
});
