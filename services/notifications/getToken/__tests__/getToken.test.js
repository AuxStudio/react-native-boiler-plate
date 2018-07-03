import getToken from '..';

jest.mock('react-native-firebase', () => {
  return {
    messaging: () => {
      return {
        getToken: jest.fn(() => {
          return new Promise((resolve) => {
            resolve('1234');
          });
        }),
      };
    },
  };
});

describe('getToken', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await getToken();
    expect(response).toEqual({ fcmToken: '1234' });
  });
});
