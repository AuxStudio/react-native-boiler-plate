import logEvent from '../';

it('resolves a promise', async () => {
  expect.assertions(1);
  return logEvent('testing').then((response) => expect(response).toBeUndefined());
});
