// Mock the bejeesus out of react-native-firebase for our unit tests
jest.mock('react-native-firebase', () => {
  return {
    analytics: jest.fn(() => {
      return {
        log: jest.fn(() => Promise.resolve()),
      };
    }),
  };
});
