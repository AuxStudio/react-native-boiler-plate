jest.mock('react-native-firebase', () => ({
  analytics: () => ({
    log(event, params) {
      return Promise.resolve();
    },
  }),
}));

import logEvent from '../'; // eslint-disable-line

it('should work with promises', async () => {
  expect.assertions(1);
  const response = await logEvent('test', { foo: 'bar' });
  expect(response).not.toBe(null);
});
