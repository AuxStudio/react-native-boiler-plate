import signIn from '../';

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

it('resolves a promise', async () => {
  expect.assertions(1);
  const response = await signIn();
  expect(response).toEqual({ name: 'Shaun' });
});
