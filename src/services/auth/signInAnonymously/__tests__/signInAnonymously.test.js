import signInAnonymously from '..'; // eslint-disable-line

jest.mock('react-native-firebase', () => {
  return {
    auth: () => {
      return {
        signInAnonymouslyAndRetrieveData: jest.fn(() => {
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

describe('signInAnonymously', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await signInAnonymously();
    expect(response).toEqual({ user: { name: 'Shaun' } });
  });
});
