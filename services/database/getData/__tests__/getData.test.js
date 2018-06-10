import getData from '../';

it('resolves a promise and returns data', async () => {
  expect.assertions(1);
  return getData().then((response) => expect(response).toEqual({ data: true }));
});
