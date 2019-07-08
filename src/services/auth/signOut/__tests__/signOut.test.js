import signOut from '..'; // eslint-disable-line

jest.mock('react-native-firebase', () => {
  return {
    auth: () => {
      return {
        signOut: jest.fn(() => {
          return new Promise((resolve) => {
            resolve();
          });
        }),
      };
    },
  };
});

describe('signOut', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await signOut();
    expect(response).toBeUndefined();
  });
});
