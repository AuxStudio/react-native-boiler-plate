import logEvent from '..'; // eslint-disable-line

jest.mock('react-native-firebase', () => {
  return {
    analytics: () => {
      return {
        log: jest.fn(() => null),
      };
    },
  };
});

describe('logEvent', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await logEvent();
    expect(response).toBeUndefined();
  });
});
