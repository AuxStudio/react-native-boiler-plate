import getAuth from '..'; // eslint-disable-line

jest.mock('react-native-firebase', () => {
  return {
    auth: () => {
      return {
        onAuthStateChanged: jest.fn((cb) => cb({ name: 'Shaun' })),
      };
    },
  };
});

describe('getAuth', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await getAuth();
    expect(response).toEqual({ user: { name: 'Shaun' } });
  });
});
