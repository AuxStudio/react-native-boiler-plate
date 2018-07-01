import getGoogleCredential from '..'; // eslint-disable-line

jest.mock('react-native-firebase', () => {
  return {
    auth: {
      GoogleAuthProvider: {
        credential: jest.fn(() => {
          return {
            idToken: '123123',
            accessToken: '123123',
          };
        }),
      },
    },
  };
});

describe('getGoogleCredential', () => {
  it('resolves a promise when id and access tokens are supplied', async () => {
    const idToken = '123123';
    const accessToken = '123123';

    expect.assertions(1);
    const response = await getGoogleCredential(idToken, accessToken);
    expect(response).toEqual({
      idToken,
      accessToken,
    });
  });

  it('rejects with error if the id token is not supplied', async () => {
    const idToken = null;
    const accessToken = '123123';

    try {
      expect.assertions(1);
      await getGoogleCredential(idToken, accessToken);
    } catch (error) {
      expect(error).toEqual(new Error('ID token is required'));
    }
  });

  it('rejects with error if the access token is not supplied', async () => {
    const idToken = '123123';
    const accessToken = null;

    try {
      expect.assertions(1);
      await getGoogleCredential(idToken, accessToken);
    } catch (error) {
      expect(error).toEqual(new Error('Access token is required'));
    }
  });
});
