// Mock the bejeesus out of react-native-firebase for our unit tests
export default {
  analytics: jest.fn(() => {
    return {
      log: jest.fn(() => Promise.resolve()),
    };
  }),
  database: () => ({
    ref: () => ({
      once: jest.fn(() =>
        Promise.resolve({
          val: jest.fn(() => {
            return true;
          }),
        }),
      ),
    }),
  }),
};
