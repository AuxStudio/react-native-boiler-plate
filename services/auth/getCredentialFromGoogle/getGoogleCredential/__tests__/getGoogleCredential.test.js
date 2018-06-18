import getGoogleCredential from '../'; // eslint-disable-line

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

it('resolves a promise', async () => {
  expect.assertions(1);
  const response = await getGoogleCredential();
  expect(response).toEqual({
    idToken: '123123',
    accessToken: '123123',
  });
});
