import getCredentialFromGoogle from '../';

jest.mock('../checkAndResolvePlayServices', () => {
  return jest.fn(() => {
    return new Promise((resolve) => {
      resolve();
    });
  });
});

jest.mock('../configureGoogleSignIn', () => {
  return jest.fn(() => {
    return new Promise((resolve) => {
      resolve();
    });
  });
});

jest.mock('../signIn', () => {
  return jest.fn(() => {
    return new Promise((resolve) => {
      resolve({ idToken: '123123', accessToken: '123123' });
    });
  });
});

jest.mock('../getGoogleCredential', () => {
  return jest.fn(() => {
    return new Promise((resolve) => {
      resolve({ idToken: '123123', accessToken: '123123' });
    });
  });
});

it('resolves a promise', async () => {
  expect.assertions(1);
  const response = await getCredentialFromGoogle();
  expect(response).toEqual({
    credential: { idToken: '123123', accessToken: '123123' },
  });
});
