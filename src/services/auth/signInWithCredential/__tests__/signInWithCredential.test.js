import signInWithCredential from '..'; // eslint-disable-line

jest.mock('react-native-firebase', () => {
  return {
    auth: () => {
      return {
        signInAndRetrieveDataWithCredential: jest.fn(() => {
          return new Promise((resolve) => {
            resolve({
              name: 'Shaun',
            });
          });
        }),
      };
    },
  };
});

describe('signInWithCredential', () => {
  it('resolves a promise when the credential is supplied', async () => {
    const credential = { accessToken: '123123' };

    expect.assertions(1);
    const response = await signInWithCredential(credential);
    expect(response).toEqual({ name: 'Shaun' });
  });

  it('rejects with error if the credential is not supplied', async () => {
    try {
      const credential = null;

      expect.assertions(1);
      await signInWithCredential(credential);
    } catch (error) {
      expect(error).toEqual(new Error('Credential is required'));
    }
  });
});
