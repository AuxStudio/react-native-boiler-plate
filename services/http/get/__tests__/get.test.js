import get from '../'; // eslint-disable-line

global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ foo: 'bar' }));

it('resolves a promise', async () => {
  expect.assertions(1);
  const response = await get('https://google.com');
  expect(response).toEqual({ data: { foo: 'bar' } });
});
