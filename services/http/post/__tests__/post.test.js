import post from '../'; // eslint-disable-line

global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ foo: 'bar' }));

it('resolves a promise', async () => {
  expect.assertions(1);
  const response = await post('https://google.com', { headers: true }, { parameters: true });
  expect(response).toEqual({ data: { foo: 'bar' } });
});
