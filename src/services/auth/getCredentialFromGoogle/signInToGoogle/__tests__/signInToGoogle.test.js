import signInToGoogle from '..';

jest.mock('react-native-google-signin', () => {
  return {
    GoogleSignIn: {
      signIn: jest.fn(() => {
        return new Promise((resolve) => {
          resolve({
            name: 'Shaun',
          });
        });
      }),
    },
  };
});

describe('signInToGoogle', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await signInToGoogle();
    expect(response).toEqual({ name: 'Shaun' });
  });
});
