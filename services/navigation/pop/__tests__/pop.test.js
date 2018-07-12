import pop from '..';

jest.mock('react-native-router-flux', () => {
  return {
    Actions: {
      pop: jest.fn(),
    },
  };
});

describe('pop', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await pop();
    expect(response).toEqual();
  });
});
