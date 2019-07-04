import getFacebookCredential from '..'; // eslint-disable-line

jest.mock('react-native-firebase', () => {
  return {
    auth: {
      FacebookAuthProvider: {
        credential: jest.fn(() => {
          return {
            accessToken: '123123',
          };
        }),
      },
    },
  };
});

describe('getFacebookCredential', () => {
  it('resolves a promise when the access token is supplied', async () => {
    const accessToken = '123123';

    expect.assertions(1);
    const response = await getFacebookCredential(accessToken);
    expect(response).toEqual({
      accessToken,
    });
  });

  it('rejects with error if the access token is not supplied', async () => {
    try {
      const accessToken = null;

      expect.assertions(1);
      await getFacebookCredential(accessToken);
    } catch (error) {
      expect(error).toEqual(new Error('Access token is required'));
    }
  });
});
