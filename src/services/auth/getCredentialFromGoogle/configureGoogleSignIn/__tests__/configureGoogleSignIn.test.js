import configureGoogleSignIn from '..';

jest.mock('react-native-google-signin', () => {
  return {
    GoogleSignIn: {
      configure: jest.fn(() => {
        return new Promise((resolve) => {
          resolve();
        });
      }),
    },
  };
});

describe('configureGoogleSignIn', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await configureGoogleSignIn();
    expect(response).toBeUndefined();
  });
});
