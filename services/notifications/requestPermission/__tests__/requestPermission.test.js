import requestPermission from '..';

jest.mock('react-native-firebase', () => {
  return {
    messaging: () => {
      return {
        requestPermission: jest.fn(() => {
          return new Promise((resolve) => {
            resolve();
          });
        }),
      };
    },
  };
});

describe('requestPermission', () => {
  it('resolves a promise', async () => {
    expect.assertions(1);
    const response = await requestPermission();
    expect(response).toBe(undefined);
  });
});
