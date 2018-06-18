import getCredentialFromFacebook from '../';

jest.mock('../logOut', () => {
  return jest.fn(() => {
    return new Promise((resolve) => {
      resolve();
    });
  });
});

jest.mock('../logIn', () => {
  return jest.fn(() => {
    return new Promise((resolve) => {
      resolve(true);
    });
  });
});

jest.mock('../getCurrentAccessToken', () => {
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

it('resolves a promise', async () => {
  expect.assertions(1);
  const response = await getCredentialFromFacebook();
  expect(response).toEqual({
    credential: { accessToken: '123123' },
  });
});
