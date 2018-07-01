import logOutFromFacebook from '..';

jest.mock('react-native-fbsdk', () => {
  return {
    LoginManager: {
      logOut: jest.fn(() => {
        return new Promise((resolve) => {
          resolve();
        });
      }),
    },
  };
});

describe('logOutFromFacebook', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await logOutFromFacebook();
    expect(response).toBeUndefined();
  });
});
