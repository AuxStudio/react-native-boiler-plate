import getCredentialFromFacebook from '..';

jest.mock('../logOutFromFacebook', () => {
  return jest.fn(() => {
    return new Promise((resolve) => {
      resolve();
    });
  });
});

jest.mock('../logInToFacebook', () => {
  return jest.fn(() => {
    return new Promise((resolve) => {
      resolve(true);
    });
  });
});

jest.mock('../getCurrentAccessTokenFromFacebook', () => {
  return jest.fn(() => {
    return new Promise((resolve) => {
      resolve({ accessToken: '123123' });
    });
  });
});

jest.mock('../getFacebookCredential', () => {
  return jest.fn(() => {
    return new Promise((resolve) => {
      resolve({ accessToken: '123123' });
    });
  });
});

describe('getCredentialFromFacebook', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await getCredentialFromFacebook();
    expect(response).toEqual({
      credential: { accessToken: '123123' },
    });
  });
});
