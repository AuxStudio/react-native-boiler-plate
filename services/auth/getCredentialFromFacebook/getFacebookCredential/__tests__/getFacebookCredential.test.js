import getFacebookCredential from '../'; // eslint-disable-line

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

it('resolves a promise', async () => {
  expect.assertions(1);
  const response = await getFacebookCredential();
  expect(response).toEqual({
    accessToken: '123123',
  });
});
