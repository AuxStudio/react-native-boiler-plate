import checkAndResolvePlayServices from '..';

jest.mock('react-native-google-signin', () => {
  return {
    GoogleSignIn: {
      hasPlayServices: jest.fn(() => {
        return new Promise((resolve) => {
          resolve();
        });
      }),
    },
  };
});

describe('checkAndResolvePlayServices', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await checkAndResolvePlayServices();
    expect(response).toBeUndefined();
  });
});
