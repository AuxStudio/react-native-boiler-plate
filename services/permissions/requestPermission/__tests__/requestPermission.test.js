import requestPermission from '../'; // eslint-disable-line

jest.mock('react-native-permissions', () => {
  return {
    request: jest.fn(() => {
      return new Promise((resolve) => {
        resolve('authorized');
      });
    }),
  };
});

it('resolves a promise', async () => {
  expect.assertions(1);
  const response = await requestPermission('camera');
  expect(response).toEqual({ message: 'authorized' });
});
