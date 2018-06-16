import sendPasswordResetEmail from '../'; // eslint-disable-line

jest.mock('react-native-firebase', () => {
  return {
    auth: () => {
      return {
        sendPasswordResetEmail: jest.fn(() => {
          return new Promise((resolve) => {
            resolve();
          });
        }),
      };
    },
  };
});

it('resolves a promise', async () => {
  expect.assertions(1);
  const response = await sendPasswordResetEmail();
  expect(response).toBeUndefined();
});
