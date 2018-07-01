import post from '..'; // eslint-disable-line

global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ foo: 'bar' }));

describe('post', () => {
  it('resolves a promise when the url is supplied', async () => {
    const url = 'https://google.com';

    expect.assertions(1);
    const response = await post(url, { headers: true }, { parameters: true });
    expect(response).toEqual({ data: { foo: 'bar' } });
  });

  it('rejects with error if the url is not supplied', async () => {
    try {
      const url = null;

      expect.assertions(1);
      await post(url, { headers: true }, { parameters: true });
    } catch (error) {
      expect(error).toEqual(new Error('URL is required'));
    }
  });
});
