import requestPermission from '..'; // eslint-disable-line

jest.mock('react-native-permissions', () => {
  return {
    request: jest.fn(() => {
      return new Promise((resolve) => {
        resolve('authorized');
      });
    }),
  };
});

describe('requestPermission', () => {
  it('resolves a promise when the permission type is supplied', async () => {
    const permission = 'camera';

    expect.assertions(1);
    const response = await requestPermission(permission);
    expect(response).toEqual({ message: 'authorized' });
  });

  it('rejects with error if the permission type is not supplied', async () => {
    try {
      const permission = null;

      expect.assertions(1);
      await requestPermission(permission);
    } catch (error) {
      expect(error).toEqual(new Error('Permission type is required'));
    }
  });
});
