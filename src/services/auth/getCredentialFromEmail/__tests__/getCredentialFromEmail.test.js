import getCredentialFromEmail from '..'; // eslint-disable-line

jest.mock('react-native-firebase', () => {
  return {
    auth: {
      EmailAuthProvider: {
        credential: jest.fn(() => {
          return {
            email: 'shaun@aux.co.za',
            password: '123123',
          };
        }),
      },
    },
  };
});

describe('getCredentialFromEmail', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await getCredentialFromEmail();
    expect(response).toEqual({
      credential: {
        email: 'shaun@aux.co.za',
        password: '123123',
      },
    });
  });
});
