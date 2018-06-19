import checkPermission from '../'; // eslint-disable-line

jest.mock('react-native-permissions', () => {
  return {
    check: jest.fn(() => {
      return new Promise((resolve) => {
        resolve('authorized');
      });
    }),
  };
});

it('resolves a promise', async () => {
  expect.assertions(1);
  const response = await checkPermission('camera');
  expect(response).toEqual({ message: 'authorized' });
});
