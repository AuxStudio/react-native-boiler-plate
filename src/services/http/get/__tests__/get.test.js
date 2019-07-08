import get from '..'; // eslint-disable-line

global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ foo: 'bar' }));

describe('get', () => {
  it('resolves a promise when the url is supplied', async () => {
    const url = 'https://google.com';

    expect.assertions(1);
    const response = await get(url);
    expect(response).toEqual({ data: { foo: 'bar' } });
  });

  it('rejects with error if the url is not supplied', async () => {
    try {
      const url = null;

      expect.assertions(1);
      await get(url);
    } catch (error) {
      expect(error).toEqual(new Error('URL is required'));
    }
  });
});
