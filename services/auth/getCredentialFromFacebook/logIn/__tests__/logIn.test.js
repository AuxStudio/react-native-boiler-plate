import logIn from '../';

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

it('resolves a promise', async () => {
  expect.assertions(1);
  const response = await logIn();
  expect(response).toBe(true);
});
