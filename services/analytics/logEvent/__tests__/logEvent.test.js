import logEvent from '../'; // eslint-disable-line

jest.mock('react-native-firebase', () => {
  return {
    analytics: () => {
      return {
        log: jest.fn(() => null),
      };
    },
  };
});

it('resolves a promise containing the user', async () => {
  expect.assertions(1);
  const response = await logEvent();
  expect(response).toBeUndefined();
});
