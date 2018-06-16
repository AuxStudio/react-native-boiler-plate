import signInWithCredential from '../'; // eslint-disable-line

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

it('resolves a promise', async () => {
  expect.assertions(1);
  const response = await signInWithCredential();
  expect(response).toEqual({ name: 'Shaun' });
});
