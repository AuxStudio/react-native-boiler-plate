import logInToFacebook from '..';

jest.mock('react-native-fbsdk', () => {
  return {
    LoginManager: {
      logInWithReadPermissions: jest.fn(() => {
        return new Promise((resolve) => {
          resolve(true);
        });
      }),
    },
  };
});

describe('logInToFacebook', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await logInToFacebook();
    expect(response).toBe(true);
  });
});
