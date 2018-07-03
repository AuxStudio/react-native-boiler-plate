import hasPermission from '..';

jest.mock('react-native-firebase', () => {
  return {
    messaging: () => {
      return {
        hasPermission: jest.fn(() => {
          return new Promise((resolve) => {
            resolve(true);
          });
        }),
      };
    },
  };
});

describe('hasPermission', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await hasPermission();
    expect(response).toEqual({ enabled: true });
  });
});
