import getCurrentAccessTokenFromFacebook from '..';

jest.mock('react-native-fbsdk', () => {
  return {
    AccessToken: {
      getCurrentAccessToken: jest.fn(() => {
        return new Promise((resolve) => {
          resolve({
            accessToken: '123123',
          });
        });
      }),
    },
  };
});

describe('getCurrentAccessTokenFromFacebook', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await getCurrentAccessTokenFromFacebook();
    expect(response).toEqual({
      accessToken: '123123',
    });
  });
});
